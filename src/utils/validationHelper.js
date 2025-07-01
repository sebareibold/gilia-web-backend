const CONSTANTS = require("../config/constants")

class ValidationHelper {
  static validatePagination(query) {
    const page = Math.max(1, Number.parseInt(query.page) || CONSTANTS.PAGINATION.DEFAULT_PAGE)
    const limit = Math.min(
      CONSTANTS.PAGINATION.MAX_LIMIT,
      Math.max(1, Number.parseInt(query.limit) || CONSTANTS.PAGINATION.DEFAULT_LIMIT),
    )
    const offset = (page - 1) * limit

    return { page, limit, offset }
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validateUrl(url) {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  static sanitizeString(str) {
    if (typeof str !== "string") return str
    return str.trim()
  }

  static validateRequired(fields, data) {
    const missing = []

    for (const field of fields) {
      if (!data[field] || (typeof data[field] === "string" && !data[field].trim())) {
        missing.push(field)
      }
    }

    return missing
  }
}

module.exports = ValidationHelper
