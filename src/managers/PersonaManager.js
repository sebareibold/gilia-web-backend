const { Persona, Usuario, Publicacion } = require("../models")

class PersonaManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, especialidad } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (especialidad) {
        whereClause.especialidades = {
          [require("sequelize").Op.contains]: [especialidad],
        }
      }

      const personas = await Persona.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: { exclude: ["password"] },
          },
          {
            model: Publicacion,
            as: "publicaciones",
          },
        ],
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: personas.rows,
        pagination: {
          total: personas.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(personas.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener personas",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const persona = await Persona.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: { exclude: ["password"] },
          },
          {
            model: Publicacion,
            as: "publicaciones",
          },
        ],
      })

      if (!persona) {
        return res.status(404).json({
          success: false,
          message: "Persona no encontrada",
        })
      }

      res.json({
        success: true,
        data: persona,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener persona",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { nombre, apellido, email_contacto, link_linkedin, link_github, especialidades, usuario_id } = req.body

      const persona = await Persona.create({
        nombre,
        apellido,
        email_contacto,
        link_linkedin,
        link_github,
        especialidades: especialidades || [],
        usuario_id,
      })

      const personaCompleta = await Persona.findByPk(persona.id, {
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: { exclude: ["password"] },
          },
        ],
      })

      res.status(201).json({
        success: true,
        message: "Persona creada exitosamente",
        data: personaCompleta,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear persona",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { nombre, apellido, email_contacto, link_linkedin, link_github, especialidades, usuario_id } = req.body

      const persona = await Persona.findByPk(id)
      if (!persona) {
        return res.status(404).json({
          success: false,
          message: "Persona no encontrada",
        })
      }

      await persona.update({
        nombre: nombre || persona.nombre,
        apellido: apellido || persona.apellido,
        email_contacto: email_contacto || persona.email_contacto,
        link_linkedin: link_linkedin || persona.link_linkedin,
        link_github: link_github || persona.link_github,
        especialidades: especialidades || persona.especialidades,
        usuario_id: usuario_id || persona.usuario_id,
      })

      const personaActualizada = await Persona.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: { exclude: ["password"] },
          },
        ],
      })

      res.json({
        success: true,
        message: "Persona actualizada exitosamente",
        data: personaActualizada,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar persona",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const persona = await Persona.findByPk(id)

      if (!persona) {
        return res.status(404).json({
          success: false,
          message: "Persona no encontrada",
        })
      }

      await persona.destroy()

      res.json({
        success: true,
        message: "Persona eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar persona",
        error: error.message,
      })
    }
  }
}

module.exports = PersonaManager
