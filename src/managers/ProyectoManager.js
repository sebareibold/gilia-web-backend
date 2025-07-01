const { Proyecto } = require("../models")

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

      res.json({
        success: true,
        data: proyectos.rows,
        pagination: {
          total: proyectos.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(proyectos.count / limit),
        },
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener proyectos",
        error: error.message,
      })
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params
      const proyecto = await Proyecto.findByPk(id)

      if (!proyecto) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        })
      }

      res.json({
        success: true,
        data: proyecto,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener proyecto",
        error: error.message,
      })
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

      res.status(201).json({
        success: true,
        message: "Proyecto creado exitosamente",
        data: proyecto,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear proyecto",
        error: error.message,
      })
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params
      const { nombre, descripcion, fecha, activo } = req.body

      const proyecto = await Proyecto.findByPk(id)
      if (!proyecto) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        })
      }

      await proyecto.update({
        nombre: nombre || proyecto.nombre,
        descripcion: descripcion || proyecto.descripcion,
        fecha: fecha || proyecto.fecha,
        activo: activo !== undefined ? activo : proyecto.activo,
      })

      res.json({
        success: true,
        message: "Proyecto actualizado exitosamente",
        data: proyecto,
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al actualizar proyecto",
        error: error.message,
      })
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params
      const proyecto = await Proyecto.findByPk(id)

      if (!proyecto) {
        return res.status(404).json({
          success: false,
          message: "Proyecto no encontrado",
        })
      }

      await proyecto.destroy()

      res.json({
        success: true,
        message: "Proyecto eliminado exitosamente",
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar proyecto",
        error: error.message,
      })
    }
  }
}

module.exports = ProyectoManager
