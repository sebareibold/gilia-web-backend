const CONSTANTS = require("../config/constants")

class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  async findAll(options = {}) {
    try {
      return await this.repository.findAll(options)
    } catch (error) {
      console.error(`Error en findAll: ${error.message}`)
      throw error
    }
  }

  async findById(id, relations = []) {
    try {
      let result
      if (relations.length > 0) {
        result = await this.repository.findWithRelations(id, relations)
      } else {
        result = await this.repository.findById(id)
      }

      if (!result) {
        const error = new Error(CONSTANTS.MESSAGES.ERROR.NOT_FOUND)
        error.status = 404
        throw error
      }

      return result
    } catch (error) {
      console.error(`Error en findById: ${error.message}`)
      throw error
    }
  }

  async create(data) {
    try {
      return await this.repository.create(data)
    } catch (error) {
      console.error(`Error en create: ${error.message}`)
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await this.repository.update(id, data)
      if (!result) {
        const error = new Error(CONSTANTS.MESSAGES.ERROR.NOT_FOUND)
        error.status = 404
        throw error
      }
      return result
    } catch (error) {
      console.error(`Error en update: ${error.message}`)
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await this.repository.delete(id)
      if (!result) {
        const error = new Error(CONSTANTS.MESSAGES.ERROR.NOT_FOUND)
        error.status = 404
        throw error
      }
      return true
    } catch (error) {
      console.error(`Error en delete: ${error.message}`)
      throw error
    }
  }

  async count(options = {}) {
    try {
      return await this.repository.count(options)
    } catch (error) {
      console.error(`Error en count: ${error.message}`)
      throw error
    }
  }
}

module.exports = BaseService
