const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Publicacion = sequelize.define(
    "Publicacion",
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
          len: [3, 300],
        },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      informacion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      linea_investigacion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "lineas_investigacion",
          key: "id",
        },
      },
      linea_extension_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "lineas_extension",
          key: "id",
        },
      },
    },
    {
      tableName: "publicaciones",
    },
  )

  Publicacion.associate = (models) => {
    Publicacion.belongsTo(models.LineaInvestigacion, {
      foreignKey: "linea_investigacion_id",
      as: "lineaInvestigacion",
    })
    Publicacion.belongsTo(models.LineaExtension, {
      foreignKey: "linea_extension_id",
      as: "lineaExtension",
    })
    Publicacion.belongsToMany(models.Persona, {
      through: "PersonaPublicacion",
      as: "personas",
      foreignKey: "publicacion_id",
      otherKey: "persona_id",
    })
  }

  return Publicacion
}
