const BaseService = require("../services/BaseService")
const RepositoryFactory = require("../repositories/RepositoryFactory")
const ResponseHelper = require("../utils/responseHelper")
const { validateRequest } = require("../middleware/validation")

// Crear el servicio usando el factory
const { Novedad } = require("../models")
const novedadRepository = RepositoryFactory.create("novedades", Novedad)
const novedadService = new BaseService(novedadRepository)

class NovedadManager {
  static async obtenerTodos(req, res) {
    try {
      const result = await novedadService.findAll(req.query)

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
      const novedad = await novedadService.findById(id)

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
      const { titulo, descripcion, link, imagen, fecha_publicacion } = req.body

      const novedadData = {
        titulo,
        descripcion,
        link,
        imagen,
        fecha_publicacion: fecha_publicacion || new Date().toISOString(),
      }

      const novedad = await novedadService.create(novedadData)

      return ResponseHelper.created(res, novedad, "Novedad creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear novedad", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body

      const novedad = await novedadService.update(id, updateData)

      return ResponseHelper.success(res, novedad, "Novedad actualizada exitosamente")
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
      await novedadService.delete(id)

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
