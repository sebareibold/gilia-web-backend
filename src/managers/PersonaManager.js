const BaseService = require("../services/BaseService")
const RepositoryFactory = require("../repositories/RepositoryFactory")
const ResponseHelper = require("../utils/responseHelper")

// Crear el servicio usando el factory
const { Persona } = require("../models")
const personaRepository = RepositoryFactory.create("personas", Persona)
const personaService = new BaseService(personaRepository)

class PersonaManager {
  static async obtenerTodos(req, res) {
    try {
      const result = await personaService.findAll(req.query)

      return ResponseHelper.successWithPagination(
        res,
        result.data,
        result.pagination,
        "Personas obtenidas exitosamente",
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener personas", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const persona = await personaService.findById(id, ["usuario", "publicaciones"])

      return ResponseHelper.success(res, persona, "Persona encontrada")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      return ResponseHelper.error(res, "Error al obtener persona", 500, error.message)
    }
  }

  static async crear(req, res) {
    try {
      const { nombre, apellido, email_contacto, link_linkedin, link_github, especialidades, usuario_id } = req.body

      const personaData = {
        nombre,
        apellido,
        email_contacto,
        link_linkedin,
        link_github,
        especialidades: especialidades || [],
        usuario_id,
      }

      const persona = await personaService.create(personaData)

      return ResponseHelper.created(res, persona, "Persona creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear persona", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body

      const persona = await personaService.update(id, updateData)

      return ResponseHelper.success(res, persona, "Persona actualizada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      return ResponseHelper.error(res, "Error al actualizar persona", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      await personaService.delete(id)

      return ResponseHelper.success(res, null, "Persona eliminada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      return ResponseHelper.error(res, "Error al eliminar persona", 500, error.message)
    }
  }
}

module.exports = PersonaManager
