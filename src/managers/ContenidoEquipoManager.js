const { ContenidoEquipo } = require("../models")

class ContenidoEquipoManager {
  static async obtenerTodos(req, res) {
    try {
      const { page = 1, limit = 10, activo } = req.query;
      const offset = (page - 1) * limit;
      
      const whereClause = {};
      if (activo !== undefined) whereClause.activo = activo === 'true';

      const contenidos = await ContenidoEquipo.findAndCountAll({
        where: whereClause,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [['created_at', 'DESC']]
      });

      res.json({
        success: true,
        data: contenidos.rows,
        pagination: {
          total: contenidos.count,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          totalPages: Math.ceil(contenidos.count / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener contenidos de equipo',
        error: error.message
      });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const contenido = await ContenidoEquipo.findByPk(id);

      if (!contenido) {
        return res.status(404).json({
          success: false,
          message: 'Contenido de equipo no encontrado'
        });
      }

      res.json({
        success: true,
        data: contenido
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener contenido de equipo',
        error: error.message
      });
    }
  }

  static async crear(req, res) {
    try {
      const { titulo, descripcion } = req.body;

      const contenido = await ContenidoEquipo.create({
        titulo,
        descripcion
      });

      res.status(201).json({
        success: true,
        message: 'Contenido de equipo creado exitosamente',
        data: contenido
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear contenido de equipo',
        error: error.message
      });
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descripcion } = req.body;

      const [updated] = await ContenidoEquipo.update({
        titulo,
        descripcion
      }, {
        where: { id: id }
      });

      if (updated) {
        const updatedContenido = await ContenidoEquipo.findByPk(id);
        res.json({
          success: true,
          message: 'Contenido de equipo actualizado exitosamente',
          data: updatedContenido
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Contenido de equipo no encontrado'
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al actualizar contenido de equipo',
        error: error.message
      });
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ContenidoEquipo.destroy({
        where: { id: id }
      });

      if (deleted) {
        res.json({
          success: true,
          message: 'Contenido de equipo eliminado exitosamente'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Contenido de equipo no encontrado'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar contenido de equipo',
        error: error.message
      });
    }
  }
}

module.exports = ContenidoEquipoManager;
