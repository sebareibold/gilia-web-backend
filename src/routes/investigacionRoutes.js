const express = require("express")
const router = express.Router()
const InvestigacionManager = require("../managers/InvestigacionManager")

router.get("/", InvestigacionManager.obtenerTodos)
router.get("/:id", InvestigacionManager.obtenerPorId)
router.post("/", InvestigacionManager.crear)
router.put("/:id", InvestigacionManager.actualizar)
router.delete("/:id", InvestigacionManager.eliminar)

module.exports = router
