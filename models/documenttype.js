const { sequelize, DataTypes } = require("../config/m3db");

const DocumentType = sequelize.define(
  "OOTYDO",
  {
    coNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      field: "UOCONO",
    },
    orderType: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      field: "UOORTP",
    },
    UODOGR: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UODOGR",
    },
    UODONR: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UODONR",
    },
    UONOEX: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UONOEX",
    },
    UORGDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UORGDT",
    },
    UORGTM: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UORGTM",
    },
    UOLMDT: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UOLMDT",
    },
    UOCHNO: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UOCHNO",
    },
    UOCHID: {
      type: DataTypes.NUMBER,
      allowNull: false,
      field: "UOCHID",
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

module.exports = DocumentType;
