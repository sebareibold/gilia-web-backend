const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Persona = sequelize.define(
    "Persona",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      email_contacto: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      link_linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      link_github: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      especialidades: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: [],
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
    },
    {
      tableName: "personas",
    },
  )

  Persona.associate = (models) => {
    Persona.belongsToMany(models.Proyecto, {
      through: 'PersonaProyecto',
      as: 'proyectos',
      foreignKey: 'persona_id',
      otherKey: 'proyecto_id',
    });
    Persona.belongsToMany(models.Publicacion, {
      through: 'PersonaPublicacion',
      as: 'publicaciones',
      foreignKey: 'persona_id',
      otherKey: 'publicacion_id',
    });
    // Asociaciones existentes
    Persona.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });
  };

  return Persona
}
