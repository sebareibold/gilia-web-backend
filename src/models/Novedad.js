const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Novedad = sequelize.define(
    "Novedad",
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
      link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha_publicacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "novedades",
    },
  )

  return Novedad
}
