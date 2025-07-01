const { Investigacion } = require("../models")

class InvestigacionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const investigaciones = await Investigacion.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: investigaciones.rows,
        pagination: {
          total: investigaciones.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(investigaciones.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener investigaciones",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const investigacion = await Investigacion.findByPk(id)

      if (!investigacion) {
        return res.status(404).json({
          success: false,
          message: "Investigación no encontrada",
        })
      }

      res.json({
        success: true,
        data: investigacion,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener investigación",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, link, imagen } = req.body

      const investigacion = await Investigacion.create({
        titulo,
        descripcion,
        link,
        imagen,
      })

      res.status(201).json({
        success: true,
        message: "Investigación creada exitosamente",
        data: investigacion,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear investigación",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, link, imagen, activo } = req.body

      const investigacion = await Investigacion.findByPk(id)
      if (!investigacion) {
        return res.status(404).json({
          success: false,
          message: "Investigación no encontrada",
        })
      }

      await investigacion.update({
        titulo: titulo || investigacion.titulo,
        descripcion: descripcion || investigacion.descripcion,
        link: link || investigacion.link,
        imagen: imagen || investigacion.imagen,
        activo: activo !== undefined ? activo : investigacion.activo,
      })

      res.json({
        success: true,
        message: "Investigación actualizada exitosamente",
        data: investigacion,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar investigación",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const investigacion = await Investigacion.findByPk(id)

      if (!investigacion) {
        return res.status(404).json({
          success: false,
          message: "Investigación no encontrada",
        })
      }

      await investigacion.destroy()

      res.json({
        success: true,
        message: "Investigación eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar investigación",
        error: error.message,
      })
    }
  }
}

module.exports = InvestigacionManager
