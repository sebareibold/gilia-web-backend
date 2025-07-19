const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Proyecto = sequelize.define(
    "Proyecto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
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
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "proyectos",
    },
  )

  Proyecto.associate = (models) => {
    Proyecto.belongsToMany(models.Persona, {
      through: "PersonaProyecto",
      as: "personas",
      foreignKey: "proyecto_id",
      otherKey: "persona_id",
    })
    Proyecto.belongsToMany(models.LineaInvestigacion, {
      through: "LineaInvestigacionProyecto",
      as: "lineasInvestigacion",
      foreignKey: "proyecto_id",
      otherKey: "linea_investigacion_id",
    })
    Proyecto.belongsToMany(models.LineaExtension, {
      through: "LineaExtensionProyecto",
      as: "lineasExtension",
      foreignKey: "proyecto_id",
      otherKey: "linea_extension_id",
    })
  }

  return Proyecto
}
