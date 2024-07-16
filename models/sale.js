const { sequelize, DataTypes } = require("../config/m3db");

const Sale = sequelize.define(
  "CSYTAB",
  {
    CTSTKY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTSTKY",
    },
    CTTX40: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTTX40",
    },
    CTSTCO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTSTCO",
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

module.exports = Sale;
