const { sequelize, DataTypes } = require("../config/m3db");

const Order = sequelize.define(
  "OOHEAD",
  {
    orderDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORDT",
    },
    requestDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OARLDT",
    },
    customerNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OACUNO",
    },
    orderDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORDT",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORNO",
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORTP",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAWHLO",
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORSL",
    },
    orderDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORDT",
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OABRLA",
    },
    totalNet: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OANTLA",
    },
    totalVat: {
      type: DataTypes.VIRTUAL,
      get() {
        return Number(
          Math.round(
            (Math.round((this.totalNet - this.totalNet / 1.07) * 10000) /
              10000) *
              100
          ) / 100
        );
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    totalDiscount: {
      type: DataTypes.VIRTUAL,
      get() {
        return Number(Math.round((this.total - this.totalNet) * 100) / 100);
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    totalNonVat: {
      type: DataTypes.VIRTUAL,
      get() {
        return Number(
          Math.round(
            (Math.round((this.totalNet - this.totalVat) * 10000) / 10000) * 100
          ) / 100
        );
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
    // tableName: "OOHEAD", // Replace with your actual table name
    // defaultScope: {
    //   attributes: ["totalDiscount", "totalDiscount"],
    // },
    // scopes: {
    //     orderDate: {
    //     attributes: ["totalDiscount"],
    //   },
    // },
  },
  {
    // tableName: "your_table_name", // Replace with your actual table name
    // defaultScope: {
    //   attributes: ["orderNo", "totalNonVat"],
    // },
  }
);

module.exports = Order;
