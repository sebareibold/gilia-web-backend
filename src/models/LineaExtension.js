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
    LineaExtension.belongsToMany(models.Novedad, {
      through: 'NovedadLineaExtension',
      as: 'novedades',
      foreignKey: 'linea_extension_id',
      otherKey: 'novedad_id',
    });
  };

  return LineaExtension
}
