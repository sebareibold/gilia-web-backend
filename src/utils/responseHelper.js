const CONSTANTS = require("../config/constants")

class ResponseHelper {
  static success(res, data = null, message = CONSTANTS.MESSAGES.SUCCESS.FOUND, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    })
  }

  static successWithPagination(res, data, pagination, message = CONSTANTS.MESSAGES.SUCCESS.FOUND) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    })
  }

  static created(res, data, message = CONSTANTS.MESSAGES.SUCCESS.CREATED) {
    return this.success(res, data, message, 201)
  }

  static error(res, message = CONSTANTS.MESSAGES.ERROR.INTERNAL, statusCode = 500, error = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    }

    if (error && process.env.NODE_ENV === "development") {
      response.error = error
    }

    return res.status(statusCode).json(response)
  }

  static notFound(res, message = CONSTANTS.MESSAGES.ERROR.NOT_FOUND) {
    return this.error(res, message, 404)
  }

  static badRequest(res, message = CONSTANTS.MESSAGES.ERROR.VALIDATION, errors = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
    }

    if (errors) {
      response.errors = errors
    }

    return res.status(400).json(response)
  }

  static unauthorized(res, message = CONSTANTS.MESSAGES.ERROR.UNAUTHORIZED) {
    return this.error(res, message, 401)
  }

  static forbidden(res, message = CONSTANTS.MESSAGES.ERROR.FORBIDDEN) {
    return this.error(res, message, 403)
  }
}

module.exports = ResponseHelper
