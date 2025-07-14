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
    LineaInvestigacion.belongsToMany(models.Novedad, {
      through: 'NovedadLineaInvestigacion',
      as: 'novedades',
      foreignKey: 'linea_investigacion_id',
      otherKey: 'novedad_id',
    });
  };

  return LineaInvestigacion
}
