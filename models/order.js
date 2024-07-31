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
      primaryKey: true,
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
  }
);

const OLINE = sequelize.define(
  "OOLINE",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "OBCONO",
    },
    OBDIVI: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "OBDIVI",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "OBORNO",
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "OBPONR",
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBORST",
    },
    OBFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBFACI",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBWHLO",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
    OBPLDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBPLDT",
    },
    OBPLHM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBPLHM",
    },

    OBPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBPRIO",
    },
    OBORQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBORQT",
    },
    OBIVQA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBIVQA",
    },
    OBATPR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBATPR",
    },
    OBMODL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBMODL",
    },
    OBTEDL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBTEDL",
    },
    OBRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBRGDT",
    },
    OBRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBRGTM",
    },
    OBLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBLMDT",
    },
    OBCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBCHNO",
    },
    OBCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBCHID",
    },
    OBLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBLMTS",
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

module.exports = { Order, OLINE };
