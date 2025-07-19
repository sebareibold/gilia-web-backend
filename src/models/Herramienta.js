const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Herramienta = sequelize.define(
    "Herramienta",
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
      link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "herramientas",
    },
  )

  Herramienta.associate = (models) => {
    Herramienta.belongsToMany(models.LineaInvestigacion, {
      through: "HerramientaLineaInvestigacion",
      as: "lineasInvestigacion",
      foreignKey: "herramienta_id",
      otherKey: "linea_investigacion_id",
    })
    Herramienta.belongsToMany(models.LineaExtension, {
      through: "HerramientaLineaExtension",
      as: "lineasExtension",
      foreignKey: "herramienta_id",
      otherKey: "linea_extension_id",
    })
  }

  return Herramienta
}
