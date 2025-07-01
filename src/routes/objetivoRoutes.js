const express = require("express")
const router = express.Router()
const ObjetivoManager = require("../managers/ObjetivoManager")

router.get("/", ObjetivoManager.obtenerTodos)
router.get("/:id", ObjetivoManager.obtenerPorId)
router.post("/", ObjetivoManager.crear)
router.put("/:id", ObjetivoManager.actualizar)
router.delete("/:id", ObjetivoManager.eliminar)

module.exports = router
