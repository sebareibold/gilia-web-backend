const { SeccionGaleria } = require("../models")

class SeccionGaleriaManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const secciones = await SeccionGaleria.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [
          ["orden", "ASC"],
          ["created_at", "DESC"],
        ],
      })

      res.json({
        success: true,
        data: secciones.rows,
        pagination: {
          total: secciones.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(secciones.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener secciones de galería",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const seccion = await SeccionGaleria.findByPk(id)

      if (!seccion) {
        return res.status(404).json({
          success: false,
          message: "Sección de galería no encontrada",
        })
      }

      res.json({
        success: true,
        data: seccion,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener sección de galería",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, fotos, orden } = req.body

      const seccion = await SeccionGaleria.create({
        titulo,
        descripcion,
        fotos: fotos || [],
        orden: orden || 0,
      })

      res.status(201).json({
        success: true,
        message: "Sección de galería creada exitosamente",
        data: seccion,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear sección de galería",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, fotos, orden, activo } = req.body

      const seccion = await SeccionGaleria.findByPk(id)
      if (!seccion) {
        return res.status(404).json({
          success: false,
          message: "Sección de galería no encontrada",
        })
      }

      await seccion.update({
        titulo: titulo || seccion.titulo,
        descripcion: descripcion || seccion.descripcion,
        fotos: fotos || seccion.fotos,
        orden: orden !== undefined ? orden : seccion.orden,
        activo: activo !== undefined ? activo : seccion.activo,
      })

      res.json({
        success: true,
        message: "Sección de galería actualizada exitosamente",
        data: seccion,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar sección de galería",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const seccion = await SeccionGaleria.findByPk(id)

      if (!seccion) {
        return res.status(404).json({
          success: false,
          message: "Sección de galería no encontrada",
        })
      }

      await seccion.destroy()

      res.json({
        success: true,
        message: "Sección de galería eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar sección de galería",
        error: error.message,
      })
    }
  }
}

module.exports = SeccionGaleriaManager
