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
      primaryKey:true,
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

module.exports = DeliverySL;
