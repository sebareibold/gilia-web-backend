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

// Initialize all models first
const models = {};
models.Usuario = Usuario(sequelize);
models.Persona = Persona(sequelize);
models.LineaInvestigacion = LineaInvestigacion(sequelize);
models.Publicacion = Publicacion(sequelize);
models.Proyecto = Proyecto(sequelize);
models.LineaExtension = LineaExtension(sequelize);
models.Novedad = Novedad(sequelize);
models.Extension = Extension(sequelize);
models.Investigacion = Investigacion(sequelize);
models.Objetivo = Objetivo(sequelize);
models.SeccionGaleria = SeccionGaleria(sequelize);
models.ContenidoPresentacion = ContenidoPresentacion(sequelize);
models.TarjetaFlotante = TarjetaFlotante(sequelize);
models.ContenidoHome = ContenidoHome(sequelize);
models.ContenidoNovedades = ContenidoNovedades(sequelize);
models.ContenidoPublicaciones = ContenidoPublicaciones(sequelize);
models.ContenidoExtension = ContenidoExtension(sequelize);
models.ContenidoEquipo = ContenidoEquipo(sequelize);
models.ContenidoGaleria = ContenidoGaleria(sequelize);

// Associate all models after all are initialized
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, ...models };
