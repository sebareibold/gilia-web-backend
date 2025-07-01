const express = require("express")
const router = express.Router()
const NovedadManager = require("../managers/NovedadManager")

router.get("/", NovedadManager.obtenerTodos)
router.get("/:id", NovedadManager.obtenerPorId)
router.post("/", NovedadManager.crear)
router.put("/:id", NovedadManager.actualizar)
router.delete("/:id", NovedadManager.eliminar)

module.exports = router
