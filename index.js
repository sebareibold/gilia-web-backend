const net = require("net")

// Inicialización de la app y el servidor
require('./src/server') 
const app = require("./src/server") // Importa la aplicación Express configurada

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
    console.error("Error al encontrar puerto disponible:", error)
    return 8080 // Puerto de respaldo
  }
}

// Función para inicializar el servidor
const initializeServer = async () => {
  try {
    // Conectar a la base de datos (MAS A FUTURO)

    // Obtener puerto disponible
    const PORT = await getPort()

    // Iniciar el servidor HTTP usando la instancia de 'app' importada
    app.listen(PORT, () => {
      console.log("*".repeat(50))
      console.log("🚀 ¡Servidor iniciado exitosamente!")
      console.log(`📡 Servidor: http://localhost:${PORT}/`)
      console.log(`⚕️  API Health Check: http://localhost:${PORT}/api/health`)
      console.log("*".repeat(50))
    })
  } catch (error) {
    console.error("❌ Error al inicializar el servidor:", error)
    process.exit(1)
  }
}

// Inicia el proceso de inicialización
initializeServer()
