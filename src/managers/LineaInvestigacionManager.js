const { LineaInvestigacion } = require("../models")

class LineaInvestigacionManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query
      const offset = (page - 1) * limit

      const whereClause = {}
      if (activo !== undefined) whereClause.activo = activo === "true"

      const lineas = await LineaInvestigacion.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [["created_at", "DESC"]],
      })

      res.json({
        success: true,
        data: lineas.rows,
        pagination: {
          total: lineas.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(lineas.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener líneas de investigación",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const linea = await LineaInvestigacion.findByPk(id)

      if (!linea) {
        return res.status(404).json({
          success: false,
          message: "Línea de investigación no encontrada",
        })
      }

      res.json({
        success: true,
        data: linea,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener línea de investigación",
        error: error.message,
      })
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion, imagenes } = req.body

      const linea = await LineaInvestigacion.create({
        titulo,
        descripcion,
        imagenes: imagenes || [],
      })

      res.status(201).json({
        success: true,
        message: "Línea de investigación creada exitosamente",
        data: linea,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear línea de investigación",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { titulo, descripcion, imagenes, activo } = req.body

      const linea = await LineaInvestigacion.findByPk(id)
      if (!linea) {
        return res.status(404).json({
          success: false,
          message: "Línea de investigación no encontrada",
        })
      }

      await linea.update({
        titulo: titulo || linea.titulo,
        descripcion: descripcion || linea.descripcion,
        imagenes: imagenes || linea.imagenes,
        activo: activo !== undefined ? activo : linea.activo,
      })

      res.json({
        success: true,
        message: "Línea de investigación actualizada exitosamente",
        data: linea,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar línea de investigación",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const linea = await LineaInvestigacion.findByPk(id)

      if (!linea) {
        return res.status(404).json({
          success: false,
          message: "Línea de investigación no encontrada",
        })
      }

      await linea.destroy()

      res.json({
        success: true,
        message: "Línea de investigación eliminada exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar línea de investigación",
        error: error.message,
      })
    }
  }

  static async obtenerPublicaciones(req, res) {
    try {
      const { id } = req.params;
      const linea = await LineaInvestigacion.findByPk(id);
      if (!linea) {
        return res.status(404).json({ success: false, message: "Línea de investigación no encontrada" });
      }
      const publicaciones = await linea.getPublicaciones();
      return res.json({ success: true, data: publicaciones });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al obtener publicaciones", error: error.message });
    }
  }

  static async agregarPublicacion(req, res) {
    try {
      const { id } = req.params;
      const { publicacionId } = req.body;
      const linea = await LineaInvestigacion.findByPk(id);
      if (!linea) {
        return res.status(404).json({ success: false, message: "Línea de investigación no encontrada" });
      }
      const { Publicacion } = require("../models");
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (!publicacion) {
        return res.status(404).json({ success: false, message: "Publicación no encontrada" });
      }
      await publicacion.update({ linea_investigacion_id: linea.id });
      return res.json({ success: true, message: "Publicación asociada a la línea de investigación" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al asociar publicación", error: error.message });
    }
  }

  static async quitarPublicacion(req, res) {
    try {
      const { id, publicacionId } = req.params;
      const linea = await LineaInvestigacion.findByPk(id);
      if (!linea) {
        return res.status(404).json({ success: false, message: "Línea de investigación no encontrada" });
      }
      const { Publicacion } = require("../models");
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (!publicacion) {
        return res.status(404).json({ success: false, message: "Publicación no encontrada" });
      }
      if (publicacion.linea_investigacion_id !== linea.id) {
        return res.status(400).json({ success: false, message: "La publicación no está asociada a esta línea" });
      }
      await publicacion.update({ linea_investigacion_id: null });
      return res.json({ success: true, message: "Publicación desasociada de la línea de investigación" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al desasociar publicación", error: error.message });
    }
  }

  static async obtenerProyectos(req, res) {
    try {
      const { id } = req.params;
      const linea = await LineaInvestigacion.findByPk(id);
      if (!linea) {
        return res.status(404).json({ success: false, message: "Línea de investigación no encontrada" });
      }
      const proyectos = await linea.getProyectos();
      return res.json({ success: true, data: proyectos });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al obtener proyectos", error: error.message });
    }
  }

  static async agregarProyecto(req, res) {
    try {
      const { id } = req.params;
      const { proyectoId } = req.body;
      const linea = await LineaInvestigacion.findByPk(id);
      if (!linea) {
        return res.status(404).json({ success: false, message: "Línea de investigación no encontrada" });
      }
      const { Proyecto } = require("../models");
      const proyecto = await Proyecto.findByPk(proyectoId);
      if (!proyecto) {
        return res.status(404).json({ success: false, message: "Proyecto no encontrado" });
      }
      await linea.addProyecto(proyecto);
      return res.json({ success: true, message: "Proyecto asociado a la línea de investigación" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al asociar proyecto", error: error.message });
    }
  }

  static async quitarProyecto(req, res) {
    try {
      const { id, proyectoId } = req.params;
      const linea = await LineaInvestigacion.findByPk(id);
      if (!linea) {
        return res.status(404).json({ success: false, message: "Línea de investigación no encontrada" });
      }
      const { Proyecto } = require("../models");
      const proyecto = await Proyecto.findByPk(proyectoId);
      if (!proyecto) {
        return res.status(404).json({ success: false, message: "Proyecto no encontrado" });
      }
      await linea.removeProyecto(proyecto);
      return res.json({ success: true, message: "Proyecto desasociado de la línea de investigación" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error al desasociar proyecto", error: error.message });
    }
  }
}

module.exports = LineaInvestigacionManager
