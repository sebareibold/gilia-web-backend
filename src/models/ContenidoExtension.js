const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const ContenidoExtension = sequelize.define(
    "ContenidoExtension",
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
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "contenido_extension",
    },
  )

  return ContenidoExtension
}
