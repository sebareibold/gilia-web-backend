const { TarjetaFlotante } = require("../models")

class TarjetaFlotanteManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const tarjetas = await TarjetaFlotante.findAndCountAll({
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
        data: tarjetas.rows,
        pagination: {
          total: tarjetas.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(tarjetas.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener tarjetas flotantes",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const tarjeta = await TarjetaFlotante.findByPk(id)

      if (!tarjeta) {
        return res.status(404).json({
          success: false,
          message: "Tarjeta flotante no encontrada",
        })
      }

      res.json({
        success: true,
        data: tarjeta,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener tarjeta flotante",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion_corta, orden } = req.body

      const tarjeta = await TarjetaFlotante.create({
        titulo,
        descripcion_corta,
        orden: orden || 0,
      })

      res.status(201).json({
        success: true,
        message: "Tarjeta flotante creada exitosamente",
        data: tarjeta,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear tarjeta flotante",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion_corta, orden, activo } = req.body

      const tarjeta = await TarjetaFlotante.findByPk(id)
      if (!tarjeta) {
        return res.status(404).json({
          success: false,
          message: "Tarjeta flotante no encontrada",
        })
      }

      await tarjeta.update({
        titulo: titulo || tarjeta.titulo,
        descripcion_corta: descripcion_corta || tarjeta.descripcion_corta,
        orden: orden !== undefined ? orden : tarjeta.orden,
        activo: activo !== undefined ? activo : tarjeta.activo,
      })

      res.json({
        success: true,
        message: "Tarjeta flotante actualizada exitosamente",
        data: tarjeta,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar tarjeta flotante",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const tarjeta = await TarjetaFlotante.findByPk(id)

      if (!tarjeta) {
        return res.status(404).json({
          success: false,
          message: "Tarjeta flotante no encontrada",
        })
      }

      await tarjeta.destroy()

      res.json({
        success: true,
        message: "Tarjeta flotante eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar tarjeta flotante",
        error: error.message,
      })
    }
  }
}

module.exports = TarjetaFlotanteManager
