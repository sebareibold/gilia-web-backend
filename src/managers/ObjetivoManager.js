const { Objetivo } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

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
      return ResponseHelper.successWithPagination(
        res,
        objetivos.rows,
        {
          total: objetivos.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(objetivos.count / limit),
        },
        "Objetivos obtenidos exitosamente"
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener objetivos", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const objetivo = await Objetivo.findByPk(id)
      if (!objetivo) {
        return ResponseHelper.notFound(res, "Objetivo no encontrado")
      }
      return ResponseHelper.success(res, objetivo, "Objetivo encontrado")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener objetivo", 500, error.message)
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
      return ResponseHelper.created(res, objetivo, "Objetivo creado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear objetivo", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, icono, orden, activo } = req.body
      const objetivo = await Objetivo.findByPk(id)
      if (!objetivo) {
        return ResponseHelper.notFound(res, "Objetivo no encontrado")
      }
      await objetivo.update({
        titulo: titulo || objetivo.titulo,
        descripcion: descripcion || objetivo.descripcion,
        icono: icono || objetivo.icono,
        orden: orden !== undefined ? orden : objetivo.orden,
        activo: activo !== undefined ? activo : objetivo.activo,
      })
      return ResponseHelper.success(res, objetivo, "Objetivo actualizado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al actualizar objetivo", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const objetivo = await Objetivo.findByPk(id)
      if (!objetivo) {
        return ResponseHelper.notFound(res, "Objetivo no encontrado")
      }
      await objetivo.destroy()
      return ResponseHelper.success(res, null, "Objetivo eliminado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al eliminar objetivo", 500, error.message)
    }
  }
}

module.exports = ObjetivoManager
