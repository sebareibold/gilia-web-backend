const express = require("express")
const router = express.Router()
const ExtensionManager = require("../managers/ExtensionManager")

router.get("/", ExtensionManager.obtenerTodos)
router.get("/:id", ExtensionManager.obtenerPorId)
router.post("/", ExtensionManager.crear)
router.put("/:id", ExtensionManager.actualizar)
router.delete("/:id", ExtensionManager.eliminar)

module.exports = router
