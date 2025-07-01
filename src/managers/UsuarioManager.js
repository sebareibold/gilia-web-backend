const { Usuario, Persona } = require("../models")
const jwt = require("jsonwebtoken")

class UsuarioManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, rol } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (rol) whereClause.rol = rol

      const usuarios = await Usuario.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
        attributes: { exclude: ["password"] },
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: usuarios.rows,
        pagination: {
          total: usuarios.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(usuarios.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener usuarios",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const usuario = await Usuario.findByPk(id, {
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
        attributes: { exclude: ["password"] },
      })

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        })
      }

      res.json({
        success: true,
        data: usuario,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener usuario",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { email, password, rol } = req.body

      // Verificar si el email ya existe
      const usuarioExistente = await Usuario.findOne({ where: { email } })
      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          message: "El email ya está registrado",
        })
      }

      const usuario = await Usuario.create({
        email,
        password,
        rol: rol || "usuario",
      })

      const usuarioRespuesta = await Usuario.findByPk(usuario.id, {
        attributes: { exclude: ["password"] },
      })

      res.status(201).json({
        success: true,
        message: "Usuario creado exitosamente",
        data: usuarioRespuesta,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear usuario",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { email, password, rol, activo } = req.body

      const usuario = await Usuario.findByPk(id)
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        })
      }

      // Verificar si el nuevo email ya existe (si se está cambiando)
      if (email && email !== usuario.email) {
        const emailExistente = await Usuario.findOne({ where: { email } })
        if (emailExistente) {
          return res.status(400).json({
            success: false,
            message: "El email ya está registrado",
          })
        }
      }

      await usuario.update({
        email: email || usuario.email,
        password: password || usuario.password,
        rol: rol || usuario.rol,
        activo: activo !== undefined ? activo : usuario.activo,
      })

      const usuarioActualizado = await Usuario.findByPk(id, {
        attributes: { exclude: ["password"] },
      })

      res.json({
        success: true,
        message: "Usuario actualizado exitosamente",
        data: usuarioActualizado,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar usuario",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const usuario = await Usuario.findByPk(id)

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        })
      }

      await usuario.destroy()

      res.json({
        success: true,
        message: "Usuario eliminado exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar usuario",
        error: error.message,
      })
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      // Buscar usuario por email
      const usuario = await Usuario.findOne({
        where: { email, activo: true },
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
      })

      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        })
      }

      // Verificar contraseña
      const passwordValida = await usuario.validarPassword(password)
      if (!passwordValida) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        })
      }

      // Generar JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      )

      res.json({
        success: true,
        message: "Login exitoso",
        data: {
          token,
          usuario: {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            persona: usuario.persona,
          },
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error en el login",
        error: error.message,
      })
    }
  }
}

module.exports = UsuarioManager
