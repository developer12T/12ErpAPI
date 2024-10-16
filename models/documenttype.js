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
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "UOORTP",
    },
    UODOGR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UODOGR",
    },
    UODONR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UODONR",
    },
    UONOEX: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UONOEX",
    },
    UORGDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UORGDT",
    },
    UORGTM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UORGTM",
    },
    UOLMDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UOLMDT",
    },
    UOCHNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UOCHNO",
    },
    UOCHID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UOCHID",
    },
    UOTXID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UOTXID",
    },
    // UODOTP: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   field: "UODOTP",
    // },
    UODOCD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UODOCD",
    },
    UODOTP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UODOTP",
    },
    UODOVA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UODOVA",
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
