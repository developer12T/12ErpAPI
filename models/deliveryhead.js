const { sequelize, DataTypes } = require("../config/m3db");

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
module.exports = DeliverySH;
