const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
      },
      createdDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://m.media-amazon.com/images/I/41CDRmBt2oL._AC_SX466_.jpg",
      },
    },
    {
      timestamps: false,
    }
  );
};
