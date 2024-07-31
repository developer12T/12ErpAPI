const { sequelize, DataTypes } = require("../config/m3db");

const Policy = sequelize.define(
  "MHDIPO",
  {
    EDDPOL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "EDDPOL",
    },
    EDTX40: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "EDDPOL",
    },
    EDTX40: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "EDDPOL",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
  }
);
