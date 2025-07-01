const express = require("express")
const router = express.Router()
const ContenidoEquipoManager = require("../managers/ContenidoEquipoManager")

router.get("/", ContenidoEquipoManager.obtenerTodos)
router.get("/:id", ContenidoEquipoManager.obtenerPorId)
router.post("/", ContenidoEquipoManager.crear)
router.put("/:id", ContenidoEquipoManager.actualizar)
router.delete("/:id", ContenidoEquipoManager.eliminar)

module.exports = router
