// Interfaz base para todos los repositorios
class BaseRepository {
  async findAll(options = {}) {
    throw new Error("Método findAll debe ser implementado")
  }

  async findById(id) {
    throw new Error("Método findById debe ser implementado")
  }

  async create(data) {
    throw new Error("Método create debe ser implementado")
  }

  async update(id, data) {
    throw new Error("Método update debe ser implementado")
  }

  async delete(id) {
    throw new Error("Método delete debe ser implementado")
  }

  async count(options = {}) {
    throw new Error("Método count debe ser implementado")
  }
}

module.exports = BaseRepository
