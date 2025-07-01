const { Novedad } = require("../models")

class NovedadManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const novedades = await Novedad.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["fecha_publicacion", "DESC"]],
      })

      res.json({
        success: true,
        data: novedades.rows,
        pagination: {
          total: novedades.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(novedades.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener novedades",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const novedad = await Novedad.findByPk(id)

      if (!novedad) {
        return res.status(404).json({
          success: false,
          message: "Novedad no encontrada",
        })
      }

      res.json({
        success: true,
        data: novedad,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener novedad",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, link, imagen, fecha_publicacion } = req.body

      const novedad = await Novedad.create({
        titulo,
        descripcion,
        link,
        imagen,
        fecha_publicacion: fecha_publicacion || new Date(),
      })

      res.status(201).json({
        success: true,
        message: "Novedad creada exitosamente",
        data: novedad,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear novedad",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, link, imagen, fecha_publicacion, activo } = req.body

      const novedad = await Novedad.findByPk(id)
      if (!novedad) {
        return res.status(404).json({
          success: false,
          message: "Novedad no encontrada",
        })
      }

      await novedad.update({
        titulo: titulo || novedad.titulo,
        descripcion: descripcion || novedad.descripcion,
        link: link || novedad.link,
        imagen: imagen || novedad.imagen,
        fecha_publicacion: fecha_publicacion || novedad.fecha_publicacion,
        activo: activo !== undefined ? activo : novedad.activo,
      })

      res.json({
        success: true,
        message: "Novedad actualizada exitosamente",
        data: novedad,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar novedad",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const novedad = await Novedad.findByPk(id)

      if (!novedad) {
        return res.status(404).json({
          success: false,
          message: "Novedad no encontrada",
        })
      }

      await novedad.destroy()

      res.json({
        success: true,
        message: "Novedad eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar novedad",
        error: error.message,
      })
    }
  }
}

module.exports = NovedadManager
