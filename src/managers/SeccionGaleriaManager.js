const { SeccionGaleria } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

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
      return ResponseHelper.successWithPagination(
        res,
        secciones.rows,
        {
          total: secciones.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(secciones.count / limit),
        },
        "Secciones de galería obtenidas exitosamente"
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener secciones de galería", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const seccion = await SeccionGaleria.findByPk(id)
      if (!seccion) {
        return ResponseHelper.notFound(res, "Sección de galería no encontrada")
      }
      return ResponseHelper.success(res, seccion, "Sección de galería encontrada")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener sección de galería", 500, error.message)
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
      return ResponseHelper.created(res, seccion, "Sección de galería creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear sección de galería", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, fotos, orden, activo } = req.body
      const seccion = await SeccionGaleria.findByPk(id)
      if (!seccion) {
        return ResponseHelper.notFound(res, "Sección de galería no encontrada")
      }
      await seccion.update({
        titulo: titulo || seccion.titulo,
        descripcion: descripcion || seccion.descripcion,
        fotos: fotos || seccion.fotos,
        orden: orden !== undefined ? orden : seccion.orden,
        activo: activo !== undefined ? activo : seccion.activo,
      })
      return ResponseHelper.success(res, seccion, "Sección de galería actualizada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al actualizar sección de galería", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const seccion = await SeccionGaleria.findByPk(id)
      if (!seccion) {
        return ResponseHelper.notFound(res, "Sección de galería no encontrada")
      }
      await seccion.destroy()
      return ResponseHelper.success(res, null, "Sección de galería eliminada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al eliminar sección de galería", 500, error.message)
    }
  }
}

module.exports = SeccionGaleriaManager
