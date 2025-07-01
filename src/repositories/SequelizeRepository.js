const BaseRepository = require("./BaseRepository")
const ValidationHelper = require("../utils/validationHelper")

class SequelizeRepository extends BaseRepository {
  constructor(model) {
    super()
    this.model = model
  }

  async findAll(options = {}) {
    const { page, limit, offset } = ValidationHelper.validatePagination(options)

    const whereClause = {}
    if (options.activo !== undefined) {
      whereClause.activo = options.activo === "true" || options.activo === true
    }

    // Filtros específicos
    if (options.categoria && this.model.name === "Publicacion") {
      whereClause.categoria = options.categoria
    }

    if (options.rol && this.model.name === "Usuario") {
      whereClause.rol = options.rol
    }

    if (options.persona_id && this.model.name === "Publicacion") {
      whereClause.persona_id = options.persona_id
    }

    if (options.especialidad && this.model.name === "Persona") {
      const { Op } = require("sequelize")
      whereClause.especialidades = {
        [Op.contains]: [options.especialidad],
      }
    }

    const result = await this.model.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: options.order || [["created_at", "DESC"]],
      include: options.include || [],
    })

    return {
      data: result.rows,
      pagination: {
        total: result.count,
        page,
        limit,
        totalPages: Math.ceil(result.count / limit),
      },
    }
  }

  async findById(id, options = {}) {
    return await this.model.findByPk(id, {
      include: options.include || [],
    })
  }

  async create(data) {
    return await this.model.create(data)
  }

  async update(id, data) {
    const instance = await this.findById(id)
    if (!instance) return null

    return await instance.update(data)
  }

  async delete(id) {
    const instance = await this.findById(id)
    if (!instance) return false

    await instance.destroy()
    return true
  }

  async count(options = {}) {
    const whereClause = {}
    if (options.activo !== undefined) {
      whereClause.activo = options.activo === "true" || options.activo === true
    }

    return await this.model.count({ where: whereClause })
  }

  async findWithRelations(id, relations = []) {
    const include = relations.map((relation) => {
      // Mapear nombres de relaciones a configuraciones de include
      if (relation === "usuario") {
        return {
          model: require("../models").Usuario,
          as: "usuario",
          attributes: { exclude: ["password"] },
        }
      }
      if (relation === "persona") {
        return {
          model: require("../models").Persona,
          as: "persona",
        }
      }
      if (relation === "publicaciones") {
        return {
          model: require("../models").Publicacion,
          as: "publicaciones",
        }
      }
      return relation
    })

    return await this.findById(id, { include })
  }
}

module.exports = SequelizeRepository
