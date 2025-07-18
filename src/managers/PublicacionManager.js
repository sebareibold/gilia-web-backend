const { Publicacion, Persona } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

class PublicacionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const offset = (page - 1) * limit
      const publicaciones = await Publicacion.findAndCountAll({
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["fecha", "DESC"]],
      })
      return ResponseHelper.successWithPagination(
        res,
        publicaciones.rows,
        {
          total: publicaciones.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(publicaciones.count / limit),
        },
        "Publicaciones obtenidas exitosamente"
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener publicaciones", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const publicacion = await Publicacion.findByPk(id)
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada")
      }
      return ResponseHelper.success(res, publicacion, "Publicación encontrada")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener publicación", 500, error.message)
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, fecha, informacion, link } = req.body
      const publicacion = await Publicacion.create({
        titulo,
        fecha,
        informacion,
        link,
      })
      const publicacionCompleta = await Publicacion.findByPk(publicacion.id)
      return ResponseHelper.created(res, publicacionCompleta, "Publicación creada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear publicación", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, fecha, informacion, link } = req.body
      const publicacion = await Publicacion.findByPk(id)
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada")
      }
      await publicacion.update({
        titulo: titulo || publicacion.titulo,
        fecha: fecha || publicacion.fecha,
        informacion: informacion || publicacion.informacion,
        link: link || publicacion.link,
      })
      const publicacionActualizada = await Publicacion.findByPk(id)
      return ResponseHelper.success(res, publicacionActualizada, "Publicación actualizada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al actualizar publicación", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const publicacion = await Publicacion.findByPk(id)
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada")
      }
      await publicacion.destroy()
      return ResponseHelper.success(res, null, "Publicación eliminada exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al eliminar publicación", 500, error.message)
    }
  }

  static async obtenerPersonas(req, res) {
    try {
      const { id } = req.params;
      const publicacion = await Publicacion.findByPk(id);
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada")
      }
      const personas = await publicacion.getPersonas();
      return ResponseHelper.success(res, personas, "Personas asociadas a la publicación")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener personas", 500, error.message)
    }
  }

  static async agregarPersona(req, res) {
    try {
      const { id } = req.params;
      const { personaId } = req.body;
      const publicacion = await Publicacion.findByPk(id);
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada")
      }
      const persona = await Persona.findByPk(personaId);
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      await publicacion.addPersona(persona);
      return ResponseHelper.success(res, null, "Persona asociada a la publicación")
    } catch (error) {
      return ResponseHelper.error(res, "Error al asociar persona", 500, error.message)
    }
  }

  static async quitarPersona(req, res) {
    try {
      const { id, personaId } = req.params;
      const publicacion = await Publicacion.findByPk(id);
      if (!publicacion) {
        return ResponseHelper.notFound(res, "Publicación no encontrada")
      }
      const persona = await Persona.findByPk(personaId);
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada")
      }
      await publicacion.removePersona(persona);
      return ResponseHelper.success(res, null, "Persona desasociada de la publicación")
    } catch (error) {
      return ResponseHelper.error(res, "Error al desasociar persona", 500, error.message)
    }
  }
}

module.exports = PublicacionManager
