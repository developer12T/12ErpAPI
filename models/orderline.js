const { sequelize, DataTypes } = require("../config/m3db");

const OLINE = sequelize.define(
  "OOLINE",
  {
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBORNO",
    },
    productNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBPONR",
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBITNO",
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBTEDS",
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBORQA",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBALUN",
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBSAPR",
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBDIA2",
    },
    netPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBNEPR",
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBLNA2",
    },
    promotionCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBPIDE",
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

module.exports = OLINE;