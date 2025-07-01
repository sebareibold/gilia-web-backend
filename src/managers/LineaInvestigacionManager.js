const { LineaInvestigacion } = require("../models")

class LineaInvestigacionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const lineas = await LineaInvestigacion.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: lineas.rows,
        pagination: {
          total: lineas.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(lineas.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener líneas de investigación",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const linea = await LineaInvestigacion.findByPk(id)

      if (!linea) {
        return res.status(404).json({
          success: false,
          message: "Línea de investigación no encontrada",
        })
      }

      res.json({
        success: true,
        data: linea,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener línea de investigación",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, imagenes } = req.body

      const linea = await LineaInvestigacion.create({
        titulo,
        descripcion,
        imagenes: imagenes || [],
      })

      res.status(201).json({
        success: true,
        message: "Línea de investigación creada exitosamente",
        data: linea,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear línea de investigación",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, imagenes, activo } = req.body

      const linea = await LineaInvestigacion.findByPk(id)
      if (!linea) {
        return res.status(404).json({
          success: false,
          message: "Línea de investigación no encontrada",
        })
      }

      await linea.update({
        titulo: titulo || linea.titulo,
        descripcion: descripcion || linea.descripcion,
        imagenes: imagenes || linea.imagenes,
        activo: activo !== undefined ? activo : linea.activo,
      })

      res.json({
        success: true,
        message: "Línea de investigación actualizada exitosamente",
        data: linea,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar línea de investigación",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const linea = await LineaInvestigacion.findByPk(id)

      if (!linea) {
        return res.status(404).json({
          success: false,
          message: "Línea de investigación no encontrada",
        })
      }

      await linea.destroy()

      res.json({
        success: true,
        message: "Línea de investigación eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar línea de investigación",
        error: error.message,
      })
    }
  }
}

module.exports = LineaInvestigacionManager
