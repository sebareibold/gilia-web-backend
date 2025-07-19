const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const LineaInvestigacion = sequelize.define(
    "LineaInvestigacion",
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
      tableName: "lineas_investigacion",
    },
  )

  LineaInvestigacion.associate = (models) => {
    LineaInvestigacion.belongsToMany(models.Herramienta, {
      through: "HerramientaLineaInvestigacion",
      as: "herramientas",
      foreignKey: "linea_investigacion_id",
      otherKey: "herramienta_id",
    })
    LineaInvestigacion.hasMany(models.Publicacion, {
      foreignKey: "linea_investigacion_id",
      as: "publicaciones",
    })
    LineaInvestigacion.belongsToMany(models.Proyecto, {
      through: "LineaInvestigacionProyecto",
      as: "proyectos",
      foreignKey: "linea_investigacion_id",
      otherKey: "proyecto_id",
    })
  }

  return LineaInvestigacion
}
