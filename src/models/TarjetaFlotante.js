const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const TarjetaFlotante = sequelize.define(
    "TarjetaFlotante",
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
      descripcion_corta: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500],
        },
      },
      orden: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "tarjetas_flotantes",
    },
  )

  return TarjetaFlotante
}
