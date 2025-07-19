const { Usuario, Persona } = require("../models");
const ResponseHelper = require("../utils/responseHelper");
const ValidationHelper = require("../utils/validationHelper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UsuarioManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Usuario.findAndCountAll({
        include: [{ model: Persona, as: "persona" }],
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["id", "ASC"]],
      });
      // Remover passwords de la respuesta
      const usuariosSinPassword = rows.map(({ dataValues }) => {
        const { password, ...usuarioSinPass } = dataValues;
        return usuarioSinPass;
      });
      return ResponseHelper.successWithPagination(
        res,
        usuariosSinPassword,
        {
          total: count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(count / limit),
        },
        "Usuarios obtenidos exitosamente"
      );
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener usuarios", 500, error.message);
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, {
        include: [{ model: Persona, as: "persona" }],
      });
      if (!usuario) {
        return ResponseHelper.notFound(res, "Usuario no encontrado");
      }
      const { password, ...usuarioSinPass } = usuario.dataValues;
      return ResponseHelper.success(res, usuarioSinPass, "Usuario encontrado");
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener usuario", 500, error.message);
    }
  }

  static async crear(req, res) {
    try {
      const { email, password, rol } = req.body;
      if (!ValidationHelper.validateEmail(email)) {
        return ResponseHelper.badRequest(res, "Email inválido");
      }
      // Verificar si el email ya existe
      const emailExists = await Usuario.findOne({ where: { email } });
      if (emailExists) {
        return ResponseHelper.error(res, "El email ya está registrado", 409);
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const usuario = await Usuario.create({
        email,
        password: hashedPassword,
        rol: rol || "usuario",
      });
      const { password: _, ...usuarioRespuesta } = usuario.dataValues;
      return ResponseHelper.created(res, usuarioRespuesta, "Usuario creado exitosamente");
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear usuario", 400, error.message);
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { email, password, rol, activo } = req.body;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return ResponseHelper.notFound(res, "Usuario no encontrado");
      }
      if (email && !ValidationHelper.validateEmail(email)) {
        return ResponseHelper.badRequest(res, "Email inválido");
      }
      if (email) usuario.email = email;
      if (rol) usuario.rol = rol;
      if (typeof activo === "boolean") usuario.activo = activo;
      if (password) usuario.password = await bcrypt.hash(password, 12);
      await usuario.save();
      const { password: _, ...usuarioRespuesta } = usuario.dataValues;
      return ResponseHelper.success(res, usuarioRespuesta, "Usuario actualizado exitosamente");
    } catch (error) {
      return ResponseHelper.error(res, "Error al actualizar usuario", 400, error.message);
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return ResponseHelper.notFound(res, "Usuario no encontrado");
      }
      await usuario.destroy();
      return ResponseHelper.success(res, null, "Usuario eliminado exitosamente");
    } catch (error) {
      return ResponseHelper.error(res, "Error al eliminar usuario", 500, error.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return ResponseHelper.badRequest(res, "Email y password son requeridos");
      }
      const usuario = await Usuario.findOne({
        where: { email, activo: true },
        include: [{ model: Persona, as: "persona" }],
      });
      if (!usuario) {
        return ResponseHelper.unauthorized(res, "Credenciales inválidas");
      }
      const passwordValida = await bcrypt.compare(password, usuario.password);
      if (!passwordValida) {
        return ResponseHelper.unauthorized(res, "Credenciales inválidas");
      }
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol,
        },
        process.env.JWT_SECRET || "default-secret",
        { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
      );
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
        "Login exitoso"
      );
    } catch (error) {
      return ResponseHelper.error(res, "Error en el login", 500, error.message);
    }
  }
}

module.exports = UsuarioManager;
