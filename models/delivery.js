const { sequelize, DataTypes } = require("../config/m3db");

const DeliveryLine = sequelize.define(
  "MHDISL",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URCONO",
    },
    URDLIX: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: "URDLIX",
    },
    URRORC: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRORC",
    },
    URRIDN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRIDN",
    },
    URRIDL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRIDL",
    },
    URITNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URITNO",
    },
    URFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URFACI",
    },
    URTRQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URTRQT",
    },
    URSTCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URSTCD",
    },
    URRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRGDT",
    },
    URRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URRGTM",
    },
    URLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URLMDT",
    },
    URCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URCHNO",
    },
    URCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URCHID",
    },
    URLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URLMTS",
    },
    URSCES: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "URSCES",
    },
    grossWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "URGRWE",
    },
    netWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "URNEWE",
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

const DeliveryHead = sequelize.define(
  "MHDISH",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQCONO",
    },
    OQDLIX: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      field: "OQDLIX",
    },
    OQDPOL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQDPOL",
    },
    OQWHLO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQWHLO",
    },
    OQINOU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQINOU",
    },
    OQCONA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQCONA",
    },
    OQSDES: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQSDES",
    },
    OQDSDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDSDT",
    },
    OQTRDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQTRDT",
    },
    OQTRTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQTRTM",
    },
    OQROUT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQROUT",
    },
    OQRORC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRORC",
    },
    OQTTYP: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQTTYP",
    },
    OQRIDN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQRIDN",
    },
    OQEDES: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQEDES",
    },

    OQNEWE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQNEWE",
    },
    OQGRWE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQGRWE",
    },
    OQTIZO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQTIZO",
    },
    OQDTDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDTDT",
    },
    OQDOCR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDOCR",
    },
    OQDOCE: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQDOCE",
    },
    OQDEWD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDEWD",
    },
    OQSEEQ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQSEEQ",
    },
    OQIVSS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQIVSS",
    },
    OQPRIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQPRIO",
    },
    OQCSCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCSCD",
    },
    OQAGKY: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQAGKY",
    },
    OQRGDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRGDT",
    },
    OQRGTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQRGTM",
    },
    OQLMDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQLMDT",
    },
    OQCHNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQCHNO",
    },
    OQCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OQCHID",
    },
    OQSCES: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQSCES",
    },
    OQLMTS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQLMTS",
    },
    OQDSHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDSHM",
    },
    OQDTHM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OQDTHM",
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

module.exports = { DeliveryHead, DeliveryLine };
