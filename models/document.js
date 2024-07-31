const { sequelize, DataTypes } = require("../config/m3db");

const Document = sequelize.define(
  "OODOCU",
  {
    coNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      field: "OFCONO",
    },
    OFDIVI: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      field: "OFDIVI",
    },
    orderNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFORNO",
    },
    OFDONR: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDONR",
    },
    OFDOVA: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDOVA",
    },
    OFDOTP: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDOTP",
    },
    OFNOEX: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFNOEX",
    },
    OFDOCD: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDOCD",
    },
    OFDODT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFDODT",
    },
    OFTXID: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFTXID",
    },
    OFRGDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFRGDT",
    },
    OFRGTM: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFRGTM",
    },
    OFLMDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFLMDT",
    },
    OFCHNO: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFCHNO",
    },
    OFCHID: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "OFCHID",
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

module.exports = Document;
