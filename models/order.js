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
    // orderStatus: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   field: "OAORSH",
    // },
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
    OAFRE1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OAFRE1",
    },
    OADISY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OADISY",
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
    grossWeight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: "OAGRWE",
    },
    netWeight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: "OANEWE",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

const OrderLine = sequelize.define(
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
      allowNull: false,
      field: "OBORST",
    },
    OBFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBFACI",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBWHLO",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      field: "OBITNO",
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBTEDS",
    },
    qtyCTN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OBORQA",
    },
    qtyPCS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OBORQT",
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
    OBDIA1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBDIA1",
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBDIA2",
    },
    OBDIA3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBDIA3",
    },
    OBDIA4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBDIA4",
    },
    OBDIA5: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBDIA5",
    },
    OBDIA6: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBDIA6",
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
      allowNull: false,
      field: "OBPIDE",
    },
    OBPLDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBPLDT",
    },
    OBPLHM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBPLHM",
    },

    OBPRIO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBPRIO",
    },
    OBIVQA: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBIVQA",
    },
    OBATPR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBATPR",
    },
    OBMODL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBMODL",
    },
    OBTEDL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBTEDL",
    },
    OBRGDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBRGDT",
    },
    OBRGTM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBRGTM",
    },
    OBLMDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBLMDT",
    },
    OBCHNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBCHNO",
    },
    OBCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBCHID",
    },
    OBLMTS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBLMTS",
    },
    OBORCO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OBORCO",
    },

    OBLNAM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OBLNAM",
    },
    OBUCOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OBUCOS",
    },
    OBCOFA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OBCOFA",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { Order, OrderLine };
