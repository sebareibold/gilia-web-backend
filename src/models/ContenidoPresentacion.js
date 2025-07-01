const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const ContenidoPresentacion = sequelize.define(
    "ContenidoPresentacion",
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
      texto_boton_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      texto_boton_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "contenido_presentacion",
    },
  )

  return ContenidoPresentacion
}
