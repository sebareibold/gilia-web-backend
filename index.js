const net = require("net")
const app = require("./src/server")

// Solo importar sequelize si se va a usar base de datos
let sequelize = null
if (process.env.USE_DATABASE === "true") {
  sequelize = require("./src/models").sequelize
}

// Función para encontrar un puerto disponible
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(startPort, () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        findAvailablePort(startPort + 1)
          .then(resolve)
          .catch(reject)
      } else {
        reject(err)
      }
    })
  })
}

// Función para obtener un puerto disponible
const getPort = async () => {
  const preferredPort = Number.parseInt(process.env.PORT, 10) || 8080
  try {
    return await findAvailablePort(preferredPort)
  } catch (error) {
    return 8080
  }
}

// Función para inicializar la base de datos (solo si se usa)
const initializeDatabase = async () => {
  if (process.env.USE_DATABASE !== "true") {
    return
  }

  try {
    await sequelize.authenticate()

    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
    }
  } catch (error) {
    throw error
  }
}

// Función para inicializar el servidor
const initializeServer = async () => {
  try {
    // Inicializar almacenamiento
    await initializeDatabase()

    // Obtener puerto disponible
    const PORT = await getPort()

    // Iniciar el servidor HTTP
    const server = app.listen(PORT, () => {
      console.log("≡".repeat(60))
      console.log("🚀 ¡Servidor GILIA iniciado exitosamente!")
      console.log(`📡 Servidor: http://localhost:${PORT}/`)
      console.log(`⚕️  API Health Check: http://localhost:${PORT}/api/health`)
      console.log("≡".repeat(60))
    })

    // Manejo de cierre graceful
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 Recibida señal ${signal}. Cerrando servidor...`)
      server.close(async () => {
        console.log("🔌 Servidor HTTP cerrado")

        if (sequelize) {
          try {
            await sequelize.close()
          } catch (error) {
            console.error("❌ Error al cerrar conexión a base de datos:", error)
          }
        }

        process.exit(0)
      })
    }

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))
    process.on("SIGINT", () => gracefulShutdown("SIGINT"))
  } catch (error) {
    process.exit(1)
  }
}

// Manejo de errores no capturados
process.on("unhandledRejection", (reason, promise) => {
  process.exit(1)
})

process.on("uncaughtException", (error) => {
  process.exit(1)
})

// Inicia el proceso de inicialización
initializeServer()
