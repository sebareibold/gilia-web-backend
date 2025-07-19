const express = require("express")
const router = express.Router()
const ContenidoPublicacionesManager = require("../managers/ContenidoPublicacionesManager")

// GET / - Obtener todos
router.get("/", async (req, res) => {
    try {
        await ContenidoPublicacionesManager.obtenerTodos(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener los contenidos de publicaciones'
        })
    }
})

// GET /:id - Obtener por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        await ContenidoPublicacionesManager.obtenerPorId(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener el contenido de publicaciones'
        })
    }
})

// POST / - Crear nuevo
router.post("/", async (req, res) => {
    try {
        const { body } = req
        
        // Validar que el body no esté vacío
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                error: 'Body vacío',
                message: 'El body de la petición no puede estar vacío'
            })
        }
        
        await ContenidoPublicacionesManager.crear(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al crear el contenido de publicaciones'
        })
    }
})

// PUT /:id - Actualizar
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        // Validar que el body no esté vacío
        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                error: 'Body vacío',
                message: 'El body de la petición no puede estar vacío'
            })
        }
        
        await ContenidoPublicacionesManager.actualizar(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al actualizar el contenido de publicaciones'
        })
    }
})

// DELETE /:id - Eliminar
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        
        // Validar que id sea un número válido
        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                error: 'ID inválido',
                message: 'El ID debe ser un número válido mayor a 0'
            })
        }
        
        await ContenidoPublicacionesManager.eliminar(req, res)
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al eliminar el contenido de publicaciones'
        })
    }
})

module.exports = router
