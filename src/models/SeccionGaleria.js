const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const SeccionGaleria = sequelize.define(
    "SeccionGaleria",
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
      fotos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
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
      tableName: "secciones_galeria",
    },
  )

  return SeccionGaleria
}
