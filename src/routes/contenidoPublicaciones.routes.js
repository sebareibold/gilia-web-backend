console.log('INICIO contenidoPublicacionesRoutes.js')
const express = require("express")
const router = express.Router()
const ContenidoPublicacionesManager = require("../managers/ContenidoPublicacionesManager")

console.log('Antes de definir rutas en contenidoPublicacionesRoutes.js')

// GET / - Obtener todos
router.get("/", async (req, res) => {
    try {
        console.log('GET / - contenidoPublicaciones - obtenerTodos')
        await ContenidoPublicacionesManager.obtenerTodos(req, res)
    } catch (error) {
        console.error('Error en GET / contenidoPublicaciones:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener los contenidos de publicaciones'
        })
    }
})

// GET /:id - Obtener por ID
router.get("/:id", async (req, res) => {
    try {
        console.log('GET /:id - contenidoPublicaciones - obtenerPorId')
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
        console.error('Error en GET /:id contenidoPublicaciones:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al obtener el contenido de publicaciones'
        })
    }
})

// POST / - Crear nuevo
router.post("/", async (req, res) => {
    try {
        console.log('POST / - contenidoPublicaciones - crear')
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
        console.error('Error en POST / contenidoPublicaciones:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al crear el contenido de publicaciones'
        })
    }
})

// PUT /:id - Actualizar
router.put("/:id", async (req, res) => {
    try {
        console.log('PUT /:id - contenidoPublicaciones - actualizar')
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
        console.error('Error en PUT /:id contenidoPublicaciones:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al actualizar el contenido de publicaciones'
        })
    }
})

// DELETE /:id - Eliminar
router.delete("/:id", async (req, res) => {
    try {
        console.log('DELETE /:id - contenidoPublicaciones - eliminar')
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
        console.error('Error en DELETE /:id contenidoPublicaciones:', error)
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Ocurrió un error al eliminar el contenido de publicaciones'
        })
    }
})

console.log('Fin de contenidoPublicacionesRoutes.js')
module.exports = router
