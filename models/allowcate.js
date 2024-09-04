const { sequelize, DataTypes } = require("../config/m3db");

const Allowcate = sequelize.define(
  "MITPLO",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOCONO",
      primaryKey: true,
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOWHLO",
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "MOITNO",
    },
    MOPLDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOPLDT",
    },
    MOTIHM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOTIHM",
    },
    MOSTAT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOSTAT",
    },
    MOPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOPRIO",
    },
    MOORCA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOORCA",
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MORIDN",
      primaryKey: true,
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MORIDL",
      primaryKey: true,
    },
    MORFTX: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MORFTX",
    },
    MORPRT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MORPRT",
    },
    MOTRQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOTRQT",
    },
    MOALMT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOALMT",
    },
    MOCALI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "MOCALI",
    },
    MOLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
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
