const { Publicacion, Persona } = require("../models")

class PublicacionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, categoria, persona_id } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (categoria) whereClause.categoria = categoria
      if (persona_id) whereClause.persona_id = persona_id

      const publicaciones = await Publicacion.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["fecha", "DESC"]],
      })

      res.json({
        success: true,
        data: publicaciones.rows,
        pagination: {
          total: publicaciones.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(publicaciones.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener publicaciones",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const publicacion = await Publicacion.findByPk(id, {
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
      })

      if (!publicacion) {
        return res.status(404).json({
          success: false,
          message: "Publicación no encontrada",
        })
      }

      res.json({
        success: true,
        data: publicacion,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener publicación",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, categoria, fecha, links, informacion, persona_id } = req.body

      const publicacion = await Publicacion.create({
        titulo,
        categoria,
        fecha,
        links: links || [],
        informacion,
        persona_id,
      })

      const publicacionCompleta = await Publicacion.findByPk(publicacion.id, {
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
      })

      res.status(201).json({
        success: true,
        message: "Publicación creada exitosamente",
        data: publicacionCompleta,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear publicación",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, categoria, fecha, links, informacion, persona_id } = req.body

      const publicacion = await Publicacion.findByPk(id)
      if (!publicacion) {
        return res.status(404).json({
          success: false,
          message: "Publicación no encontrada",
        })
      }

      await publicacion.update({
        titulo: titulo || publicacion.titulo,
        categoria: categoria || publicacion.categoria,
        fecha: fecha || publicacion.fecha,
        links: links || publicacion.links,
        informacion: informacion || publicacion.informacion,
        persona_id: persona_id || publicacion.persona_id,
      })

      const publicacionActualizada = await Publicacion.findByPk(id, {
        include: [
          {
            model: Persona,
            as: "persona",
          },
        ],
      })

      res.json({
        success: true,
        message: "Publicación actualizada exitosamente",
        data: publicacionActualizada,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar publicación",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const publicacion = await Publicacion.findByPk(id)

      if (!publicacion) {
        return res.status(404).json({
          success: false,
          message: "Publicación no encontrada",
        })
      }

      await publicacion.destroy()

      res.json({
        success: true,
        message: "Publicación eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar publicación",
        error: error.message,
      })
    }
  }
}

module.exports = PublicacionManager
