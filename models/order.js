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
      allowNull: true,
      primaryKey: true,
      field: "OBCONO",
    },
    OBDIVI: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "OBDIVI",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "OBORNO",
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      primaryKey: true,
      field: "OBITNO",
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBTEDS",
    },
    qtyCTN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBORQA",
    },
    qtyPCS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBORQT",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBALUN",
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBSAPR",
    },
    OBDIA1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBDIA1",
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      field: "OBNEPR",
    },
    total: {
      type: DataTypes.STRING,
      allowNull: true,
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
    OBORCO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OBORCO",
    },

    OBLNAM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBLNAM",
    },
    OBUCOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBUCOS",
    },
    OBCOFA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCOFA",
    },
    OBACRF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBACRF",
    },
    OBDWDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDWDT",
    },
    OBCODT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCODT",
    },
    OBCOHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCOHM",
    },
    OBDWDZ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDWDZ",
    },
    OBCODZ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCODZ",
    },
    OBTIZO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBTIZO",
    },
    OBSTCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBSTCD",
    },
    OBCOCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCOCD",
    },
    OBUCCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBUCCD",
    },
    OBVTCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBVTCD",
    },
    OBSMCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBSMCD",
    },
    OBCUNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCUNO",
    },
    OBADID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBADID",
    },
    OBROUT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBROUT",
    },
    OBRODN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBRODN",
    },
    OBDSDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDSDT",
    },
    OBDSHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDSHM",
    },
    OBFDED: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBFDED",
    },
    OBLDED: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBLDED",
    },
    OBCINA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCINA",
    },
    OBDECU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDECU",
    },
    OBTEPY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBTEPY",
    },
    OBPMOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBPMOR",
    },
    OBUPAV: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBUPAV",
    },
    OBSPUN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBSPUN",
    },
    OBPRMO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBPRMO",
    },
    OBDIC1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIC1",
    },
    OBDIC2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIC2",
    },
    OBDIC3: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIC3",
    },
    OBDIC4: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIC4",
    },
    OBDIC5: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIC5",
    },
    OBDIC6: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIC6",
    },
    OBCMP5: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBCMP5",
    },
    OBDIBE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIBE",
    },
    OBDIRE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDIRE",
    },
    OBDDSU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OBDDSU",
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
