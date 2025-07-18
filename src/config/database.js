const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Conexión usando connection string (ideal para Supabase)
  // Sequelize es el ORM que permite interactuar con bases de datos SQL usando JavaScript.
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  });
} else {
  // Configuración tradicional
  //Si NO existe DATABASE_URL, usa los parámetros tradicionales (DB_HOST, DB_USER, etc.) para conectarse a una base local o personalizada.
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "research_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  });
}

module.exports = { sequelize };

/*
  ===================== Breve resumen =====================

  Explicacion de como se hace la conexion con la BD de Supabase
      - Se importa Sequelize, que es una librería para trabajar con bases de datos SQL desde JavaScript.
      - Se cargan las variables de entorno usando dotenv, para poder leer datos como el usuario, contraseña, host, etc., desde un archivo .env.
      - El código revisa si existe la variable de entorno DATABASE_URL:
      - Si existe, la usa para conectarse directamente a la base de datos (por ejemplo, a Supabase), usando esa URL completa.
      - Si no existe, usa las variables tradicionales (DB_HOST, DB_USER, DB_PASSWORD, etc.) para armar la conexión a una base de datos local o personalizada.
      - Se crea un objeto de conexión (sequelize) usando los datos anteriores.
      - Ese objeto de conexión se exporta para que el resto de la aplicación pueda usarlo y así interactuar con la base de datos (crear tablas, consultar datos, etc.).

  Este componente se usa para poder definir los modelos (tablas) , para autentificar y sincronizar la BD al iniciar el SV
  y ademas para ejecutar las consultas a la base de datos desde los disintos servicios y controladores.
*/
