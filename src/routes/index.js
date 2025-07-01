const express = require("express")
const router = express.Router()


const app = require("../server")

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})

module.exports = router
