const BaseService = require("../service/BaseService")
const RepositoryFactory = require("../repositories/RepositoryFactory")
const ResponseHelper = require("../utils/responseHelper")
const ValidationHelper = require("../utils/validationHelper")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Crear el servicio usando el factory
const { Usuario } = require("../models")
const usuarioRepository = RepositoryFactory.create("usuarios", Usuario)
const usuarioService = new BaseService(usuarioRepository)

class UsuarioManager {
  static async obtenerTodos(req, res) {
    try {
      const result = await usuarioService.findAll(req.query)

      // Remover passwords de la respuesta
      const usuariosSinPassword = result.data.map((usuario) => {
        const { password, ...usuarioSinPass } = usuario
        return usuarioSinPass
      })

      return ResponseHelper.successWithPagination(
        res,
        usuariosSinPassword,
        result.pagination,
        "Usuarios obtenidos exitosamente",
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener usuarios", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const usuario = await usuarioService.findById(id, ["persona"])

      // Remover password
      const { password, ...usuarioSinPass } = usuario

      return ResponseHelper.success(res, usuarioSinPass, "Usuario encontrado")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Usuario no encontrado")
      }
      return ResponseHelper.error(res, "Error al obtener usuario", 500, error.message)
    }
  }

  static async crear(req, res) {
    try {
      const { email, password, rol } = req.body

      // Validar email
      if (!ValidationHelper.validateEmail(email)) {
        return ResponseHelper.badRequest(res, "Email inválido")
      }

      // Verificar si el email ya existe (para JSON)
      if (process.env.USE_DATABASE !== "true") {
        const existingUsers = await usuarioService.findAll({ limit: 1000 })
        const emailExists = existingUsers.data.some((user) => user.email === email)
        if (emailExists) {
          return ResponseHelper.error(res, "El email ya está registrado", 409)
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      const usuarioData = {
        email,
        password: hashedPassword,
        rol: rol || "usuario",
      }

      const usuario = await usuarioService.create(usuarioData)

      // Remover password de la respuesta
      const { password: _, ...usuarioRespuesta } = usuario

      return ResponseHelper.created(res, usuarioRespuesta, "Usuario creado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear usuario", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { email, password, rol, activo } = req.body

      const updateData = { email, rol, activo }

      // Hash nueva password si se proporciona
      if (password) {
        updateData.password = await bcrypt.hash(password, 12)
      }

      const usuario = await usuarioService.update(id, updateData)

      // Remover password de la respuesta
      const { password: _, ...usuarioRespuesta } = usuario

      return ResponseHelper.success(res, usuarioRespuesta, "Usuario actualizado exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Usuario no encontrado")
      }
      return ResponseHelper.error(res, "Error al actualizar usuario", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      await usuarioService.delete(id)

      return ResponseHelper.success(res, null, "Usuario eliminado exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Usuario no encontrado")
      }
      return ResponseHelper.error(res, "Error al eliminar usuario", 500, error.message)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return ResponseHelper.badRequest(res, "Email y password son requeridos")
      }

      // Buscar usuario por email
      let usuario = null
      if (process.env.USE_DATABASE === "true") {
        // Lógica para base de datos
        const { Usuario } = require("../models")
        usuario = await Usuario.findOne({
          where: { email, activo: true },
          include: [{ model: require("../models").Persona, as: "persona" }],
        })
      } else {
        // Lógica para JSON
        const allUsers = await usuarioService.findAll({ limit: 1000 })
        usuario = allUsers.data.find((u) => u.email === email && u.activo !== false)

        if (usuario) {
          // Simular relación con persona
          usuario = await usuarioService.findById(usuario.id, ["persona"])
        }
      }

      if (!usuario) {
        return ResponseHelper.unauthorized(res, "Credenciales inválidas")
      }

      // Verificar contraseña
      const passwordValida = await bcrypt.compare(password, usuario.password)
      if (!passwordValida) {
        return ResponseHelper.unauthorized(res, "Credenciales inválidas")
      }

      // Generar JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol,
        },
        process.env.JWT_SECRET || "default-secret",
        { expiresIn: process.env.JWT_EXPIRES_IN || "24h" },
      )

      return ResponseHelper.success(
        res,
        {
          token,
          usuario: {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            persona: usuario.persona,
          },
        },
        "Login exitoso",
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error en el login", 500, error.message)
    }
  }
}

module.exports = UsuarioManager
