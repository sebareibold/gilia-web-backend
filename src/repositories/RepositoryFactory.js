const JsonRepository = require("./JsonRepository")
const SequelizeRepository = require("./SequelizeRepository")

class RepositoryFactory {
  static create(tableName, model = null) {
    // Si USE_DATABASE es true, usar SequelizeRepository
    if (process.env.USE_DATABASE === "true") {
      if (!model) {
        throw new Error("Model is required when using database")
      }
      return new SequelizeRepository(model)
    }
    
    // Por defecto usar JsonRepository
    return new JsonRepository(tableName)
  }
}

module.exports = RepositoryFactory 