const { ContenidoExtension } = require("../models")

class ContenidoExtensionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const contenidos = await ContenidoExtension.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: contenidos.rows,
        pagination: {
          total: contenidos.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(contenidos.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener contenidos de extensión",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const contenido = await ContenidoExtension.findByPk(id)

      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: "Contenido de extensión no encontrado",
        })
      }

      res.json({
        success: true,
        data: contenido,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener contenido de extensión",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion } = req.body

      const contenido = await ContenidoExtension.create({
        titulo,
        descripcion,
      })

      res.status(201).json({
        success: true,
        message: "Contenido de extensión creado exitosamente",
        data: contenido,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear contenido de extensión",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, activo } = req.body

      const contenido = await ContenidoExtension.findByPk(id)
      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: "Contenido de extensión no encontrado",
        })
      }

      await contenido.update({
        titulo: titulo || contenido.titulo,
        descripcion: descripcion || contenido.descripcion,
        activo: activo !== undefined ? activo : contenido.activo,
      })

      res.json({
        success: true,
        message: "Contenido de extensión actualizado exitosamente",
        data: contenido,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar contenido de extensión",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const contenido = await ContenidoExtension.findByPk(id)

      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: "Contenido de extensión no encontrado",
        })
      }

      await contenido.destroy()

      res.json({
        success: true,
        message: "Contenido de extensión eliminado exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar contenido de extensión",
        error: error.message,
      })
    }
  }
}

module.exports = ContenidoExtensionManager
