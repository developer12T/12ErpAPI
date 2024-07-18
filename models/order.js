const { sequelize, DataTypes } = require("../config/m3db");

const Order = sequelize.define(
  "OOHEAD",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OACONO",
    },
    OADIVI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OADIVI",
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
    OAFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAFACI",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAWHLO",
    },
    requestDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OARLDT",
    },

    customerNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OACUNO",
    },
    orderDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OAORDT",
    },

    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAORSL",
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAADID",
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: "OABRLA",
    },
    totalNet: {
      type: DataTypes.DECIMAL,
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
        throw new Error("Do not try to set the `totalVat` value!");
      },
    },
    totalDiscount: {
      type: DataTypes.VIRTUAL,
      get() {
        return Number(Math.round((this.total - this.totalNet) * 100) / 100);
      },
      set(value) {
        throw new Error("Do not try to set the `totalDiscount` value!");
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
        throw new Error("Do not try to set the `totalNonVat` value!");
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
