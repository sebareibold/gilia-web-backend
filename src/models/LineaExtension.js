const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const LineaExtension = sequelize.define(
    "LineaExtension",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 200],
        },
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imagenes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "lineas_extension",
    },
  )

  LineaExtension.associate = (models) => {
    LineaExtension.belongsToMany(models.Herramienta, {
      through: "HerramientaLineaExtension",
      as: "herramientas",
      foreignKey: "linea_extension_id",
      otherKey: "herramienta_id",
    })
    LineaExtension.hasMany(models.Publicacion, {
      foreignKey: "linea_extension_id",
      as: "publicaciones",
    })
    LineaExtension.belongsToMany(models.Proyecto, {
      through: "LineaExtensionProyecto",
      as: "proyectos",
      foreignKey: "linea_extension_id",
      otherKey: "proyecto_id",
    })
  }

  return LineaExtension
}
