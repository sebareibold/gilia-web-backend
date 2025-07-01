const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Objetivo = sequelize.define(
    "Objetivo",
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
      icono: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "objetivos",
    },
  )

  return Objetivo
}
