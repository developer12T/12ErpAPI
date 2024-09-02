const { sequelize, DataTypes } = require("../config/m3db");
const MGHEAD = sequelize.define(
  "MGHEAD",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "MGCONO",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "MGTRNR",
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGTRTP",
    },
    MGFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGFACI",
    },
    MGRESP: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGRESP",
    },
    MGATHS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGATHS",
    },
    statusLow: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGTRSL",
    },
    statusHigh: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGTRSH",
    },
    MGPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGPRIO",
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGTRDT",
    },
    MGTRTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MGTRTM",
    },
    MGRIDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MGRIDT",
    },
    MGRITM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MGRITM",
    },
    towarehouse: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGTWLO",
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGREMK",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGWHLO",
    },
    MGGRWE: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGGRWE",
    },
    MGNUGL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGNUGL",
    },
    MGRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGRGDT",
    },
    MGRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGRGTM",
    },
    MGLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGLMDT",
    },
    MGCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGCHNO",
    },
    MGCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGCHID",
    },
    MGLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MGLMTS",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

const MGLINE = sequelize.define(
  "MGLINE",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRCONO",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "MRTRNR",
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "MRPONR",
    },
    MRTRSH: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTRSH",
    },
    MRWHLO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRWHLO",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "MRITNO",
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRITDS",
    },
    MRGRWE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MRGRWE",
    },
    MRTRDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTRDT",
    },
    MRSTAS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRSTAS",
    },
    MRTWSL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTWSL",
    },
    itemQty: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTRQT",
    },
    MRTRSH: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTRSH",
    },
    itemUnit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRALUN",
    },
    itemLocation: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRWHSL",
    },
    itemLot: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRBANO",
    },
    itemStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTRSH",
    },
    MRRPQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRRPQT",
    },
    MRACQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRACQT",
    },
    MRSTCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRSTCD",
    },
    MRCUCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRCUCD",
    },
    MRPRDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRPRDT",
    },
    MRNUCR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRNUCR",
    },
    MRRESP: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRRESP",
    },
    MRTIHM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRTIHM",
    },
    MRRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRRGDT",
    },
    MRRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRRGTM",
    },
    MRLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRLMDT",
    },
    MRCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRCHNO",
    },
    MRCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRCHID",
    },
    MRLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRLMTS",
    },
    MRPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MRPRIO",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = {
  MGHEAD,
  MGLINE,
};
