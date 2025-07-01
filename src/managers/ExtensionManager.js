const { Extension } = require("../models")

class ExtensionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const extensiones = await Extension.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: extensiones.rows,
        pagination: {
          total: extensiones.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(extensiones.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener extensiones",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const extension = await Extension.findByPk(id)

      if (!extension) {
        return res.status(404).json({
          success: false,
          message: "Extensión no encontrada",
        })
      }

      res.json({
        success: true,
        data: extension,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener extensión",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, link, imagen } = req.body

      const extension = await Extension.create({
        titulo,
        descripcion,
        link,
        imagen,
      })

      res.status(201).json({
        success: true,
        message: "Extensión creada exitosamente",
        data: extension,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear extensión",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, link, imagen, activo } = req.body

      const extension = await Extension.findByPk(id)
      if (!extension) {
        return res.status(404).json({
          success: false,
          message: "Extensión no encontrada",
        })
      }

      await extension.update({
        titulo: titulo || extension.titulo,
        descripcion: descripcion || extension.descripcion,
        link: link || extension.link,
        imagen: imagen || extension.imagen,
        activo: activo !== undefined ? activo : extension.activo,
      })

      res.json({
        success: true,
        message: "Extensión actualizada exitosamente",
        data: extension,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar extensión",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const extension = await Extension.findByPk(id)

      if (!extension) {
        return res.status(404).json({
          success: false,
          message: "Extensión no encontrada",
        })
      }

      await extension.destroy()

      res.json({
        success: true,
        message: "Extensión eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar extensión",
        error: error.message,
      })
    }
  }
}

module.exports = ExtensionManager
