const { ContenidoPresentacion } = require("../models")

class ContenidoPresentacionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const contenidos = await ContenidoPresentacion.findAndCountAll({
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
        message: "Error al obtener contenidos de presentación",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const contenido = await ContenidoPresentacion.findByPk(id)

      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: "Contenido de presentación no encontrado",
        })
      }

      res.json({
        success: true,
        data: contenido,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener contenido de presentación",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, texto_boton_1, texto_boton_2 } = req.body

      const contenido = await ContenidoPresentacion.create({
        titulo,
        descripcion,
        texto_boton_1,
        texto_boton_2,
      })

      res.status(201).json({
        success: true,
        message: "Contenido de presentación creado exitosamente",
        data: contenido,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear contenido de presentación",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, texto_boton_1, texto_boton_2, activo } = req.body

      const contenido = await ContenidoPresentacion.findByPk(id)
      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: "Contenido de presentación no encontrado",
        })
      }

      await contenido.update({
        titulo: titulo || contenido.titulo,
        descripcion: descripcion || contenido.descripcion,
        texto_boton_1: texto_boton_1 || contenido.texto_boton_1,
        texto_boton_2: texto_boton_2 || contenido.texto_boton_2,
        activo: activo !== undefined ? activo : contenido.activo,
      })

      res.json({
        success: true,
        message: "Contenido de presentación actualizado exitosamente",
        data: contenido,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar contenido de presentación",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const contenido = await ContenidoPresentacion.findByPk(id)

      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: "Contenido de presentación no encontrado",
        })
      }

      await contenido.destroy()

      res.json({
        success: true,
        message: "Contenido de presentación eliminado exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar contenido de presentación",
        error: error.message,
      })
    }
  }
}

module.exports = ContenidoPresentacionManager
