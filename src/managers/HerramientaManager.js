const { Herramienta } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

class HerramientaManager {
  static async obtenerTodos(req, res) {
    try {
      const herramientas = await Herramienta.findAll(req.query)
      return ResponseHelper.successWithPagination(
        res,
        herramientas.data,
        herramientas.pagination,
        "Herramientas obtenidas exitosamente",
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener herramientas", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const herramienta = await Herramienta.findByPk(id)
      return ResponseHelper.success(res, herramienta, "Herramienta encontrada")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      return ResponseHelper.error(res, "Error al obtener herramienta", 500, error.message)
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, link } = req.body

      // Validaciones básicas
      if (!titulo || typeof titulo !== 'string' || titulo.length < 3) {
        return ResponseHelper.error(res, "El título es requerido y debe tener al menos 3 caracteres", 400)
      }
      if (link && typeof link === 'string' && !/^https?:\/\//.test(link)) {
        return ResponseHelper.error(res, "El link debe ser una URL válida", 400)
      }

      const herramientaData = {
        titulo,
        descripcion,
        link,
      }

      const herramienta = await Herramienta.create(herramientaData)
      return ResponseHelper.created(res, herramienta, "Herramienta creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear herramienta", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const updatedHerramienta = await herramienta.update(updateData)
      return ResponseHelper.success(res, updatedHerramienta, "Herramienta actualizada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      return ResponseHelper.error(res, "Error al actualizar herramienta", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      await herramienta.destroy()
      return ResponseHelper.success(res, null, "Herramienta eliminada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      return ResponseHelper.error(res, "Error al eliminar herramienta", 500, error.message)
    }
  }

  static async agregarLineaInvestigacion(req, res) {
    try {
      const { id } = req.params
      const { lineaId } = req.body
      if (!lineaId) {
        return ResponseHelper.error(res, "Debe proporcionar el ID de la línea de investigación", 400)
      }
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const { LineaInvestigacion } = require("../models")
      const linea = await LineaInvestigacion.findByPk(lineaId)
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de investigación no encontrada")
      }
      await herramienta.addLineasInvestigacion(linea)
      return ResponseHelper.success(res, null, "Línea de investigación asignada a la herramienta")
    } catch (error) {
      return ResponseHelper.error(res, "Error al asignar línea de investigación", 400, error.message)
    }
  }

  static async quitarLineaInvestigacion(req, res) {
    try {
      const { id, lineaId } = req.params
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const { LineaInvestigacion } = require("../models")
      const linea = await LineaInvestigacion.findByPk(lineaId)
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de investigación no encontrada")
      }
      await herramienta.removeLineasInvestigacion(linea)
      return ResponseHelper.success(res, null, "Línea de investigación quitada de la herramienta")
    } catch (error) {
      return ResponseHelper.error(res, "Error al quitar línea de investigación", 400, error.message)
    }
  }

  static async obtenerLineasInvestigacion(req, res) {
    try {
      const { id } = req.params
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const lineas = await herramienta.getLineasInvestigacion()
      return ResponseHelper.success(res, lineas, "Líneas de investigación asociadas a la herramienta")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener líneas de investigación", 400, error.message)
    }
  }

  static async agregarLineaExtension(req, res) {
    try {
      const { id } = req.params
      const { lineaId } = req.body
      if (!lineaId) {
        return ResponseHelper.error(res, "Debe proporcionar el ID de la línea de extensión", 400)
      }
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const { LineaExtension } = require("../models")
      const linea = await LineaExtension.findByPk(lineaId)
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de extensión no encontrada")
      }
      await herramienta.addLineasExtension(linea)
      return ResponseHelper.success(res, null, "Línea de extensión asignada a la herramienta")
    } catch (error) {
      return ResponseHelper.error(res, "Error al asignar línea de extensión", 400, error.message)
    }
  }

  static async quitarLineaExtension(req, res) {
    try {
      const { id, lineaId } = req.params
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const { LineaExtension } = require("../models")
      const linea = await LineaExtension.findByPk(lineaId)
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de extensión no encontrada")
      }
      await herramienta.removeLineasExtension(linea)
      return ResponseHelper.success(res, null, "Línea de extensión quitada de la herramienta")
    } catch (error) {
      return ResponseHelper.error(res, "Error al quitar línea de extensión", 400, error.message)
    }
  }

  static async obtenerLineasExtension(req, res) {
    try {
      const { id } = req.params
      const herramienta = await Herramienta.findByPk(id)
      if (!herramienta) {
        return ResponseHelper.notFound(res, "Herramienta no encontrada")
      }
      const lineas = await herramienta.getLineasExtension()
      return ResponseHelper.success(res, lineas, "Líneas de extensión asociadas a la herramienta")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener líneas de extensión", 400, error.message)
    }
  }
}

module.exports = HerramientaManager 