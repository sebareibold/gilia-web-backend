const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Publicacion = sequelize.define(
    "Publicacion",
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
          len: [3, 300],
        },
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      links: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      informacion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      persona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "personas",
          key: "id",
        },
      },
    },
    {
      tableName: "publicaciones",
    },
  )

  Publicacion.associate = (models) => {
    Publicacion.belongsTo(models.Persona, {
      foreignKey: "persona_id",
      as: "persona",
    })
  }

  return Publicacion
}
