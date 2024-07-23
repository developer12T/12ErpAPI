const { sequelize, DataTypes } = require("../config/m3db");

const DeliverySH = sequelize.define(
  "MHDISL",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCONO",
    },
    OQDLIX: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDLIX",
    },
    OQDPOL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDPOL",
    },
    OQWHLO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQWHLO",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQINOU",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCONA",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQSDES",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDSDT",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQTRDT",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQTRTM",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQROUT",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQRORC",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQTTYP",
    },
    orderNo: {
        OQRIDN: DataTypes.STRING,
      allowNull: false,
      field: "OQRIDN",
    },
    OQEDES: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQEDES",
    },
    OQPGRS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQPGRS",
    },
    OQPIST: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQPIST",
    },
    OQNEWE: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQNEWE",
    },
    OQGRWE: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQGRWE",
    },
    OQTIZO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQTIZO",
    },
    OQDTDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDTDT",
    },
    OQDOCR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDOCR",
    },
    OQDOCE: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDOCE",
    },
    OQDEWD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDEWD",
    },
    OQSEEQ: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQSEEQ",
    },
    OQIVSS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQIVSS",
    },
    OQPRIO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQPRIO",
    },
    OQCSCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCSCD",
    },
    OQAGKY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQAGKY",
    },
    OQIRST: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQIRST",
    },
    OQRGDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQRGDT",
    },
    OQRGTM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQRGTM",
    },
    OQLMDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQLMDT",
    },
    OQCHNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCHNO",
    },
    OQCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCHID",
    },
    OQSCES: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQSCES",
    },
    OQLMTS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQLMTS",
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

const DeliverySL = sequelize.define(
  "MHDISH",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URCONO",
    },
    URDLIX: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URDLIX",
    },
    URRORC: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URRORC",
    },
    URRIDN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URRIDN",
    },
    URRIDL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URRIDL",
    },
    URITNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URITNO",
    },
    URFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URFACI",
    },
    URTRQT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URTRQT",
    },
    URSTCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URSTCD",
    },
    URRGDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URRGDT",
    },
    URRGTM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URRGTM",
    },
    URLMDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URLMDT",
    },
    URCHNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URCHNO",
    },
    URCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URCHID",
    },
    URLMTS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URLMTS",
    },
    URSCES: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URSCES",
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
