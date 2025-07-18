const { Persona } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

class PersonaManager {
  static async obtenerTodos(req, res) {
    try {
      const result = await Persona.findAll(req.query)

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
      const persona = await Persona.findByPk(id, {
        include: ["usuario", "publicaciones"],
      })

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

      const persona = await Persona.create(personaData)

      return ResponseHelper.created(res, persona, "Persona creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear persona", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const updateData = req.body

      const persona = await Persona.findByPk(id)
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }

      const updatedPersona = await persona.update(updateData)

      return ResponseHelper.success(res, updatedPersona, "Persona actualizada exitosamente")
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
      const persona = await Persona.findByPk(id)
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      await persona.destroy()

      return ResponseHelper.success(res, null, "Persona eliminada exitosamente")
    } catch (error) {
      if (error.status === 404) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      return ResponseHelper.error(res, "Error al eliminar persona", 500, error.message)
    }
  }

  static async obtenerPublicaciones(req, res) {
    try {
      const { id } = req.params;
      const persona = await Persona.findByPk(id, {
        include: ["publicaciones"],
      });
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada");
      }
      const publicaciones = persona.publicaciones;
      return ResponseHelper.success(res, publicaciones, "Publicaciones asociadas a la persona");
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener publicaciones", 500, error.message);
    }
  }

  static async agregarPublicacion(req, res) {
    try {
      const { id } = req.params;
      const { publicacionId } = req.body;
      const persona = await Persona.findByPk(id);
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada");
      }
      const { Publicacion } = require("../models");
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada");
      }
      await persona.addPublicacion(publicacion);
      return ResponseHelper.success(res, null, "Publicación asociada a la persona");
    } catch (error) {
      return ResponseHelper.error(res, "Error al asociar publicación", 500, error.message);
    }
  }

  static async quitarPublicacion(req, res) {
    try {
      const { id, publicacionId } = req.params;
      const persona = await Persona.findByPk(id);
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada");
      }
      const { Publicacion } = require("../models");
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada");
      }
      await persona.removePublicacion(publicacion);
      return ResponseHelper.success(res, null, "Publicación desasociada de la persona");
    } catch (error) {
      return ResponseHelper.error(res, "Error al desasociar publicación", 500, error.message);
    }
  }
}

module.exports = PersonaManager
