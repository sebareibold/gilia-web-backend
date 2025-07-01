const express = require("express")
const router = express.Router()
const ContenidoExtensionManager = require("../managers/ContenidoExtensionManager")

router.get("/", ContenidoExtensionManager.obtenerTodos)
router.get("/:id", ContenidoExtensionManager.obtenerPorId)
router.post("/", ContenidoExtensionManager.crear)
router.put("/:id", ContenidoExtensionManager.actualizar)
router.delete("/:id", ContenidoExtensionManager.eliminar)

module.exports = router
