const { Proyecto } = require("../models")
const ResponseHelper = require("../utils/responseHelper")

class ProyectoManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit
      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"
      const proyectos = await Proyecto.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["fecha", "DESC"]],
      })
      return ResponseHelper.successWithPagination(
        res,
        proyectos.rows,
        {
          total: proyectos.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(proyectos.count / limit),
        },
        "Proyectos obtenidos exitosamente"
      )
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener proyectos", 500, error.message)
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const proyecto = await Proyecto.findByPk(id)
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado")
      }
      return ResponseHelper.success(res, proyecto, "Proyecto encontrado")
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener proyecto", 500, error.message)
    }
  }

  static async crear(req, res) {
    try {
      const { nombre, descripcion, fecha } = req.body
      const proyecto = await Proyecto.create({
        nombre,
        descripcion,
        fecha,
      })
      return ResponseHelper.created(res, proyecto, "Proyecto creado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al crear proyecto", 400, error.message)
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { nombre, descripcion, fecha, activo } = req.body
      const proyecto = await Proyecto.findByPk(id)
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado")
      }
      await proyecto.update({
        nombre: nombre || proyecto.nombre,
        descripcion: descripcion || proyecto.descripcion,
        fecha: fecha || proyecto.fecha,
        activo: activo !== undefined ? activo : proyecto.activo,
      })
      return ResponseHelper.success(res, proyecto, "Proyecto actualizado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al actualizar proyecto", 400, error.message)
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const proyecto = await Proyecto.findByPk(id)
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado")
      }
      await proyecto.destroy()
      return ResponseHelper.success(res, null, "Proyecto eliminado exitosamente")
    } catch (error) {
      return ResponseHelper.error(res, "Error al eliminar proyecto", 500, error.message)
    }
  }

  // Personas asociadas
  static async obtenerPersonas(req, res) {
    try {
      const { id } = req.params;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const personas = await proyecto.getPersonas();
      return ResponseHelper.success(res, personas, "Personas asociadas al proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener personas", 500, error.message);
    }
  }
  static async agregarPersona(req, res) {
    try {
      const { id } = req.params;
      const { personaId } = req.body;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { Persona } = require("../models");
      const persona = await Persona.findByPk(personaId);
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada");
      }
      await proyecto.addPersona(persona);
      return ResponseHelper.success(res, null, "Persona asociada al proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al asociar persona", 500, error.message);
    }
  }
  static async quitarPersona(req, res) {
    try {
      const { id, personaId } = req.params;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { Persona } = require("../models");
      const persona = await Persona.findByPk(personaId);
      if (!persona) {
        return ResponseHelper.notFound(res, "Persona no encontrada");
      }
      await proyecto.removePersona(persona);
      return ResponseHelper.success(res, null, "Persona desasociada del proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al desasociar persona", 500, error.message);
    }
  }

  // Lineas de Investigacion asociadas
  static async obtenerLineasInvestigacion(req, res) {
    try {
      const { id } = req.params;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { LineaInvestigacion } = require("../models");
      const lineas = await proyecto.getLineaInvestigacions ? await proyecto.getLineaInvestigacions() : [];
      return ResponseHelper.success(res, lineas, "Líneas de investigación asociadas al proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener líneas de investigación", 500, error.message);
    }
  }
  static async agregarLineaInvestigacion(req, res) {
    try {
      const { id } = req.params;
      const { lineaId } = req.body;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { LineaInvestigacion } = require("../models");
      const linea = await LineaInvestigacion.findByPk(lineaId);
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de investigación no encontrada");
      }
      await proyecto.addLineaInvestigacion(linea);
      return ResponseHelper.success(res, null, "Línea de investigación asociada al proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al asociar línea de investigación", 500, error.message);
    }
  }
  static async quitarLineaInvestigacion(req, res) {
    try {
      const { id, lineaId } = req.params;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { LineaInvestigacion } = require("../models");
      const linea = await LineaInvestigacion.findByPk(lineaId);
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de investigación no encontrada");
      }
      await proyecto.removeLineaInvestigacion(linea);
      return ResponseHelper.success(res, null, "Línea de investigación desasociada del proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al desasociar línea de investigación", 500, error.message);
    }
  }

  // Lineas de Extension asociadas
  static async obtenerLineasExtension(req, res) {
    try {
      const { id } = req.params;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { LineaExtension } = require("../models");
      const lineas = await proyecto.getLineaExtensions ? await proyecto.getLineaExtensions() : [];
      return ResponseHelper.success(res, lineas, "Líneas de extensión asociadas al proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al obtener líneas de extensión", 500, error.message);
    }
  }
  static async agregarLineaExtension(req, res) {
    try {
      const { id } = req.params;
      const { lineaId } = req.body;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { LineaExtension } = require("../models");
      const linea = await LineaExtension.findByPk(lineaId);
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de extensión no encontrada");
      }
      await proyecto.addLineaExtension(linea);
      return ResponseHelper.success(res, null, "Línea de extensión asociada al proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al asociar línea de extensión", 500, error.message);
    }
  }
  static async quitarLineaExtension(req, res) {
    try {
      const { id, lineaId } = req.params;
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        return ResponseHelper.notFound(res, "Proyecto no encontrado");
      }
      const { LineaExtension } = require("../models");
      const linea = await LineaExtension.findByPk(lineaId);
      if (!linea) {
        return ResponseHelper.notFound(res, "Línea de extensión no encontrada");
      }
      await proyecto.removeLineaExtension(linea);
      return ResponseHelper.success(res, null, "Línea de extensión desasociada del proyecto");
    } catch (error) {
      return ResponseHelper.error(res, "Error al desasociar línea de extensión", 500, error.message);
    }
  }
}

module.exports = ProyectoManager
