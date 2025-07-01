const ValidationHelper = require("../utils/validationHelper")
const ResponseHelper = require("../utils/responseHelper")

const validateRequest = (requiredFields = []) => {
  return (req, res, next) => {
    const missing = ValidationHelper.validateRequired(requiredFields, req.body)

    if (missing.length > 0) {
      return ResponseHelper.badRequest(
        res,
        "Campos requeridos faltantes",
        missing.map((field) => ({ field, message: "Campo requerido" })),
      )
    }

    // Sanitizar strings
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = ValidationHelper.sanitizeString(req.body[key])
      }
    }

    next()
  }
}

const validateEmail = (req, res, next) => {
  if (req.body.email && !ValidationHelper.validateEmail(req.body.email)) {
    return ResponseHelper.badRequest(res, "Email inválido")
  }
  next()
}

const validateUrl = (field) => {
  return (req, res, next) => {
    if (req.body[field] && !ValidationHelper.validateUrl(req.body[field])) {
      return ResponseHelper.badRequest(res, `URL inválida en campo ${field}`)
    }
    next()
  }
}

module.exports = {
  validateRequest,
  validateEmail,
  validateUrl,
}
