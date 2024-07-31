const { sequelize, DataTypes } = require("../config/m3db");

const Allowcate = sequelize.define(
  "MITPLO",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MOCONO",
      primaryKey: true,
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MOWHLO",
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MOITNO",
    },
    MOPLDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOPLDT",
    },
    MOTIHM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOTIHM",
    },
    MOSTAT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOSTAT",
    },
    MOPRIO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOPRIO",
    },
    MOORCA: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOORCA",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MORIDN",
      primaryKey: true,
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MORIDL",
      primaryKey: true,
    },
    MORFTX: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MORFTX",
    },
    MORPRT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MORPRT",
    },
    MOTRQT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOTRQT",
    },
    MOALMT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOALMT",
    },
    MOCALI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOCALI",
    },
    MOLMTS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MOLMTS",
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

module.exports = Allowcate;
