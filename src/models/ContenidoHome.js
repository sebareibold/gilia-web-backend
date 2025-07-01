const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const ContenidoHome = sequelize.define(
    "ContenidoHome",
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
      tableName: "contenido_home",
    },
  )

  return ContenidoHome
}
