// Constantes de la aplicación
const CONSTANTS = {
  // Roles de usuario
  USER_ROLES: {
    ADMIN: "admin",
    INVESTIGADOR: "investigador",
    EDITOR: "editor",
    USUARIO: "usuario",
  },

  // Estados
  STATUS: {
    ACTIVE: true,
    INACTIVE: false,
  },

  // Paginación
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  // Validaciones
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 255,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 200,
  },

  // Mensajes de respuesta
  MESSAGES: {
    SUCCESS: {
      CREATED: "Recurso creado exitosamente",
      UPDATED: "Recurso actualizado exitosamente",
      DELETED: "Recurso eliminado exitosamente",
      FOUND: "Recurso encontrado",
    },
    ERROR: {
      NOT_FOUND: "Recurso no encontrado",
      VALIDATION: "Error de validación",
      DUPLICATE: "Recurso ya existe",
      UNAUTHORIZED: "No autorizado",
      FORBIDDEN: "Acceso denegado",
      INTERNAL: "Error interno del servidor",
    },
  },
}

module.exports = CONSTANTS
