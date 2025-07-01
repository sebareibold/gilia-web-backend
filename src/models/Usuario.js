const { DataTypes } = require("sequelize")
const bcrypt = require("bcryptjs")

module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 255],
        },
      },
      rol: {
        type: DataTypes.ENUM("admin", "investigador", "editor", "usuario"),
        allowNull: false,
        defaultValue: "usuario",
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "usuarios",
      hooks: {
        beforeCreate: async (usuario) => {
          if (usuario.password) {
            usuario.password = await bcrypt.hash(usuario.password, 12)
          }
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed("password")) {
            usuario.password = await bcrypt.hash(usuario.password, 12)
          }
        },
      },
    },
  )

  Usuario.prototype.validarPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Persona, {
      foreignKey: "usuario_id",
      as: "persona",
    })
  }

  return Usuario
}
