const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const ContenidoGaleria = sequelize.define(
    "ContenidoGaleria",
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
    },
    {
      tableName: "contenido_galeria",
    },
  )

  return ContenidoGaleria
}
