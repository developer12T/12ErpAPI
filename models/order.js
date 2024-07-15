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
        return this.total - this.totalNet;
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
    // promotionName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   field: "FZTX40",
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


module.exports = {
  Order,
  OLINE,
};
