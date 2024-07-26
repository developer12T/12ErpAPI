const { sequelize, DataTypes } = require("../config/m3db");

const DeliverySL = sequelize.define(
  "MHDISL",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "URCONO",
    },
    URDLIX: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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

const DeliverySH = sequelize.define(
  "MHDISH",
  {
    coNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQCONO",
    },
    OQDLIX: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      field: "OQDLIX",
    },
    OQDPOL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQDPOL",
    },
    OQWHLO: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQWHLO",
    },
    OQINOU: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQINOU",
    },
    OQCONA: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQCONA",
    },
    OQSDES: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQSDES",
    },
    OQDSDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQDSDT",
    },
    OQTRDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQTRDT",
    },
    OQTRTM: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQTRTM",
    },
    OQROUT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQROUT",
    },
    OQRORC: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQRORC",
    },
    OQTTYP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQTTYP",
    },
    OQRIDN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQRIDN",
    },
    OQEDES: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQEDES",
    },

    OQNEWE: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQNEWE",
    },
    OQGRWE: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQGRWE",
    },
    OQTIZO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQTIZO",
    },
    OQDTDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQDTDT",
    },
    OQDOCR: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQDOCR",
    },
    OQDOCE: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQDOCE",
    },
    OQDEWD: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQDEWD",
    },
    OQSEEQ: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQSEEQ",
    },
    OQIVSS: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQIVSS",
    },
    OQPRIO: {
      type: DataTypes.NUMBER,
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
    OQRGDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQRGDT",
    },
    OQRGTM: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQRGTM",
    },
    OQLMDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQLMDT",
    },
    OQCHNO: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQCHNO",
    },
    OQCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OQCHID",
    },
    OQSCES: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OQSCES",
    },
    OQLMTS: {
      type: DataTypes.NUMBER,
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

module.exports = { DeliverySH, DeliverySL };
