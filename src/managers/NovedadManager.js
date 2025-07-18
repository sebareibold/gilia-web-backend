const { Novedad } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

class NovedadManager {
  static async obtenerTodos(req, res) {
    try {
      const result = await Novedad.findAll(req.query)

      return ResponseHelper.successWithPagination(
        res,
        result.data,
        result.pagination,
        "Novedades obtenidas exitosamente",
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener novedades", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const novedad = await Novedad.findByPk(id)

      return ResponseHelper.success(res, novedad, "Novedad encontrada")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Novedad no encontrada")
      }
      return ResponseHelper.error(res, "Error al obtener novedad", 500, error.message)
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, link, imagen, fecha } = req.body

      // Validaciones básicas
      if (!titulo || typeof titulo !== 'string' || titulo.length < 3) {
        return ResponseHelper.error(res, "El título es requerido y debe tener al menos 3 caracteres", 400)
      }
      if (link && typeof link === 'string' && !/^https?:\/\//.test(link)) {
        return ResponseHelper.error(res, "El link debe ser una URL válida", 400)
      }
      if (imagen && typeof imagen === 'string' && !/^https?:\/\//.test(imagen)) {
        return ResponseHelper.error(res, "La imagen debe ser una URL válida", 400)
      }

      const novedadData = {
        titulo,
        descripcion,
        link,
        imagen,
        fecha: fecha || new Date().toISOString(),
      }

      const novedad = await Novedad.create(novedadData)

      return ResponseHelper.created(res, novedad, "Novedad creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear novedad", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body

      const novedad = await Novedad.update(updateData, { where: { id } })
      const updatedNovedad = await Novedad.findByPk(id)

      return ResponseHelper.success(res, updatedNovedad, "Novedad actualizada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Novedad no encontrada")
      }
      return ResponseHelper.error(res, "Error al actualizar novedad", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      await Novedad.destroy({ where: { id } })

      return ResponseHelper.success(res, null, "Novedad eliminada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Novedad no encontrada")
      }
      return ResponseHelper.error(res, "Error al eliminar novedad", 500, error.message)
    }
  }
}

module.exports = NovedadManager
