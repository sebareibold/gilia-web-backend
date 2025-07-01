const express = require("express")
const router = express.Router()
const ProyectoManager = require("../managers/ProyectoManager")

router.get("/", ProyectoManager.obtenerTodos)
router.get("/:id", ProyectoManager.obtenerPorId)
router.post("/", ProyectoManager.crear)
router.put("/:id", ProyectoManager.actualizar)
router.delete("/:id", ProyectoManager.eliminar)

module.exports = router
