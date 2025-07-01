const { sequelize } = require("../config/database")

// Import all models
const Usuario = require("./Usuario")
const Persona = require("./Persona")
const LineaInvestigacion = require("./LineaInvestigacion")
const Publicacion = require("./Publicacion")
const Proyecto = require("./Proyecto")
const LineaExtension = require("./LineaExtension")
const Novedad = require("./Novedad")
const Extension = require("./Extension")
const Investigacion = require("./Investigacion")
const Objetivo = require("./Objetivo")
const SeccionGaleria = require("./SeccionGaleria")
const ContenidoPresentacion = require("./ContenidoPresentacion")
const TarjetaFlotante = require("./TarjetaFlotante")
const ContenidoHome = require("./ContenidoHome")
const ContenidoNovedades = require("./ContenidoNovedades")
const ContenidoPublicaciones = require("./ContenidoPublicaciones")
const ContenidoExtension = require("./ContenidoExtension")
const ContenidoEquipo = require("./ContenidoEquipo")
const ContenidoGaleria = require("./ContenidoGaleria")

// Initialize models
const models = {
  Usuario: Usuario(sequelize),
  Persona: Persona(sequelize),
  LineaInvestigacion: LineaInvestigacion(sequelize),
  Publicacion: Publicacion(sequelize),
  Proyecto: Proyecto(sequelize),
  LineaExtension: LineaExtension(sequelize),
  Novedad: Novedad(sequelize),
  Extension: Extension(sequelize),
  Investigacion: Investigacion(sequelize),
  Objetivo: Objetivo(sequelize),
  SeccionGaleria: SeccionGaleria(sequelize),
  ContenidoPresentacion: ContenidoPresentacion(sequelize),
  TarjetaFlotante: TarjetaFlotante(sequelize),
  ContenidoHome: ContenidoHome(sequelize),
  ContenidoNovedades: ContenidoNovedades(sequelize),
  ContenidoPublicaciones: ContenidoPublicaciones(sequelize),
  ContenidoExtension: ContenidoExtension(sequelize),
  ContenidoEquipo: ContenidoEquipo(sequelize),
  ContenidoGaleria: ContenidoGaleria(sequelize),
}

// Define associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

module.exports = { sequelize, ...models }
