const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const ContenidoNovedades = sequelize.define(
    "ContenidoNovedades",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      palabras_magicas: {
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
      tableName: "contenido_novedades",
    },
  )

  return ContenidoNovedades
}
