const { Objetivo } = require("../models")

class ObjetivoManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const objetivos = await Objetivo.findAndCountAll({
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
        data: objetivos.rows,
        pagination: {
          total: objetivos.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(objetivos.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener objetivos",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const objetivo = await Objetivo.findByPk(id)

      if (!objetivo) {
        return res.status(404).json({
          success: false,
          message: "Objetivo no encontrado",
        })
      }

      res.json({
        success: true,
        data: objetivo,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener objetivo",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, icono, orden } = req.body

      const objetivo = await Objetivo.create({
        titulo,
        descripcion,
        icono,
        orden: orden || 0,
      })

      res.status(201).json({
        success: true,
        message: "Objetivo creado exitosamente",
        data: objetivo,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear objetivo",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, icono, orden, activo } = req.body

      const objetivo = await Objetivo.findByPk(id)
      if (!objetivo) {
        return res.status(404).json({
          success: false,
          message: "Objetivo no encontrado",
        })
      }

      await objetivo.update({
        titulo: titulo || objetivo.titulo,
        descripcion: descripcion || objetivo.descripcion,
        icono: icono || objetivo.icono,
        orden: orden !== undefined ? orden : objetivo.orden,
        activo: activo !== undefined ? activo : objetivo.activo,
      })

      res.json({
        success: true,
        message: "Objetivo actualizado exitosamente",
        data: objetivo,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar objetivo",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const objetivo = await Objetivo.findByPk(id)

      if (!objetivo) {
        return res.status(404).json({
          success: false,
          message: "Objetivo no encontrado",
        })
      }

      await objetivo.destroy()

      res.json({
        success: true,
        message: "Objetivo eliminado exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar objetivo",
        error: error.message,
      })
    }
  }
}

module.exports = ObjetivoManager
