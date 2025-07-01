const express = require("express")
const router = express.Router()
const PersonaManager = require("../managers/PersonaManager")

router.get("/", PersonaManager.obtenerTodos)
router.get("/:id", PersonaManager.obtenerPorId)
router.post("/", PersonaManager.crear)
router.put("/:id", PersonaManager.actualizar)
router.delete("/:id", PersonaManager.eliminar)

module.exports = router
