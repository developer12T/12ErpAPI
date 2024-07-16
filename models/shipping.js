const { sequelize, DataTypes } = require("../config/m3db");

const Shipping = sequelize.define(
  "OCUSAD",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCONO",
    },
    customerNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUNO",
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPADID",
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUNM",
    },
    shippingAddress1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA1",
    },
    shippingAddress2: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA2",
    },
    shippingAddress3: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA3",
    },
    shippingPoscode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPONO",
    },
    shippingPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPHNO",
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

module.exports = Shipping;
