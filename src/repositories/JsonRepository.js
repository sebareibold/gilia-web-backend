const fs = require("fs/promises")
const path = require("path")
const BaseRepository = require("./BaseRepository")
const ValidationHelper = require("../utils/validationHelper")

class JsonRepository extends BaseRepository {
  constructor(tableName) {
    super()
    this.tableName = tableName
    this.dbPath = path.join(__dirname, "../database/db.json")
  }

  async _readDb() {
    try {
      const data = await fs.readFile(this.dbPath, "utf-8")
      return JSON.parse(data)
    } catch (error) {
      console.error(`Error leyendo base de datos JSON: ${error.message}`)
      return this._getDefaultDb()
    }
  }

  async _writeDb(db) {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2), "utf-8")
    } catch (error) {
      console.error(`Error escribiendo base de datos JSON: ${error.message}`)
      throw error
    }
  }

  _getDefaultDb() {
    return {
      novedades: [],
      investigaciones: [],
      lineas_investigacion: [],
      publicaciones: [],
      personas: [],
      proyectos: [],
      extensiones: [],
      lineas_extension: [],
      usuarios: [],
      objetivos: [],
      secciones_galeria: [],
      contenido_home: [],
      contenido_presentacion: [],
      tarjetas_flotantes: [],
      contenido_novedades: [],
      contenido_publicaciones: [],
      contenido_equipo: [],
      contenido_galeria: [],
      contenido_extension: [],
    }
  }

  _generateId(items) {
    if (items.length === 0) return 1
    return Math.max(...items.map((item) => item.id || 0)) + 1
  }

  _applyFilters(items, options = {}) {
    let filtered = [...items]

    // Filtro por activo
    if (options.activo !== undefined) {
      const isActive = options.activo === "true" || options.activo === true
      filtered = filtered.filter((item) => item.activo === isActive)
    }

    // Filtros específicos por tabla
    if (options.categoria && this.tableName === "publicaciones") {
      filtered = filtered.filter((item) => item.categoria === options.categoria)
    }

    if (options.especialidad && this.tableName === "personas") {
      filtered = filtered.filter((item) => item.especialidades && item.especialidades.includes(options.especialidad))
    }

    if (options.rol && this.tableName === "usuarios") {
      filtered = filtered.filter((item) => item.rol === options.rol)
    }

    if (options.persona_id && this.tableName === "publicaciones") {
      filtered = filtered.filter((item) => item.persona_id === Number.parseInt(options.persona_id))
    }

    return filtered
  }

  _applyPagination(items, options = {}) {
    const { page, limit, offset } = ValidationHelper.validatePagination(options)

    const paginatedItems = items.slice(offset, offset + limit)

    return {
      data: paginatedItems,
      pagination: {
        total: items.length,
        page,
        limit,
        totalPages: Math.ceil(items.length / limit),
      },
    }
  }

  _applySorting(items, options = {}) {
    if (!options.order) {
      // Orden por defecto según el tipo de tabla
      if (this.tableName === "novedades") {
        return items.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion))
      }
      if (this.tableName === "publicaciones") {
        return items.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      }
      if (this.tableName === "proyectos") {
        return items.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      }
      if (
        this.tableName === "objetivos" ||
        this.tableName === "secciones_galeria" ||
        this.tableName === "tarjetas_flotantes"
      ) {
        return items.sort((a, b) => (a.orden || 0) - (b.orden || 0))
      }
      // Orden por defecto: created_at DESC
      return items.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    }

    // Aplicar orden personalizado si se proporciona
    const [field, direction] = options.order[0] || ["created_at", "DESC"]
    return items.sort((a, b) => {
      const aVal = a[field]
      const bVal = b[field]

      if (direction.toUpperCase() === "ASC") {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }

  async findAll(options = {}) {
    const db = await this._readDb()
    const items = db[this.tableName] || []

    const filtered = this._applyFilters(items, options)
    const sorted = this._applySorting(filtered, options)

    return this._applyPagination(sorted, options)
  }

  async findById(id) {
    const db = await this._readDb()
    const items = db[this.tableName] || []

    const item = items.find((item) => item.id === Number.parseInt(id))
    if (!item) {
      return null
    }

    return item
  }

  async create(data) {
    const db = await this._readDb()
    if (!db[this.tableName]) {
      db[this.tableName] = []
    }

    const newItem = {
      ...data,
      id: this._generateId(db[this.tableName]),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      activo: data.activo !== undefined ? data.activo : true,
    }

    db[this.tableName].push(newItem)
    await this._writeDb(db)

    return newItem
  }

  async update(id, data) {
    const db = await this._readDb()
    const items = db[this.tableName] || []

    const index = items.findIndex((item) => item.id === Number.parseInt(id))
    if (index === -1) {
      return null
    }

    const updatedItem = {
      ...items[index],
      ...data,
      updated_at: new Date().toISOString(),
    }

    db[this.tableName][index] = updatedItem
    await this._writeDb(db)

    return updatedItem
  }

  async delete(id) {
    const db = await this._readDb()
    const items = db[this.tableName] || []

    const index = items.findIndex((item) => item.id === Number.parseInt(id))
    if (index === -1) {
      return false
    }

    db[this.tableName].splice(index, 1)
    await this._writeDb(db)

    return true
  }

  async count(options = {}) {
    const db = await this._readDb()
    const items = db[this.tableName] || []
    const filtered = this._applyFilters(items, options)

    return filtered.length
  }

  // Métodos específicos para relaciones
  async findWithRelations(id, relations = []) {
    const item = await this.findById(id)
    if (!item) return null

    const db = await this._readDb()

    // Simular relaciones básicas
    for (const relation of relations) {
      if (relation === "usuario" && item.usuario_id) {
        const usuarios = db.usuarios || []
        const usuario = usuarios.find((u) => u.id === item.usuario_id)
        if (usuario) {
          const { password, ...usuarioSinPassword } = usuario
          item.usuario = usuarioSinPassword
        }
      }

      if (relation === "persona" && item.persona_id) {
        const personas = db.personas || []
        item.persona = personas.find((p) => p.id === item.persona_id)
      }

      if (relation === "publicaciones" && this.tableName === "personas") {
        const publicaciones = db.publicaciones || []
        item.publicaciones = publicaciones.filter((p) => p.persona_id === item.id)
      }
    }

    return item
  }
}

module.exports = JsonRepository
