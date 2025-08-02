
const { sequelize, DataTypes } = require("../config/m3db");
const Sale = sequelize.define(
  "CSYTAB",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "CTCONO",
    },
    saleCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "CTSTKY",
    },
    saleName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTTX40",
    },
    CTSTCO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTSTCO",
    },
    // saleNameFull: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return saleName;
    //   },
    //   set(value) {
    //     throw new Error("Do not try to set the `saleNameFull` value!");
    //   },
    // },
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
