const ResponseHelper = require("../utils/responseHelper")

const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  })

  // Error de validación de Sequelize
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
      value: e.value,
    }))
    return ResponseHelper.badRequest(res, "Error de validación", errors)
  }

  // Error de clave duplicada
  if (err.name === "SequelizeUniqueConstraintError") {
    return ResponseHelper.error(res, "Recurso ya existe", 409)
  }

  // Error de clave foránea
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return ResponseHelper.badRequest(res, "Referencia inválida")
  }

  // Error de conexión a base de datos
  if (err.name === "SequelizeConnectionError") {
    return ResponseHelper.error(res, "Error de conexión a la base de datos", 503)
  }

  // Error JWT
  if (err.name === "JsonWebTokenError") {
    return ResponseHelper.unauthorized(res, "Token inválido")
  }

  if (err.name === "TokenExpiredError") {
    return ResponseHelper.unauthorized(res, "Token expirado")
  }

  // Error genérico
  return ResponseHelper.error(res, err.message, err.status || 500, err.stack)
}

module.exports = errorHandler
