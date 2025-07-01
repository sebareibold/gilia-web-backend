const express = require("express")
const router = express.Router()
const LineaExtensionManager = require("../managers/LineaExtensionManager")

router.get("/", LineaExtensionManager.obtenerTodos)
router.get("/:id", LineaExtensionManager.obtenerPorId)
router.post("/", LineaExtensionManager.crear)
router.put("/:id", LineaExtensionManager.actualizar)
router.delete("/:id", LineaExtensionManager.eliminar)

module.exports = router
