const { sequelize, DataTypes } = require("../config/m3db");

const NumberSeries = sequelize.define(
  "CSYNBR",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "CNCONO",
    },
    series: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "CNNBID",
    },
    seriesType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "CNNBTY",
    },
    seriesName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CNNBDE",
    },
    startNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CNNBLO",
    },
    finalNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CNNBHI",
    },
    lastNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CNNBNR",
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

const NumberSeriesInvoice = sequelize.define(
  "CSYNBI",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "C2CONO",
    },
    series: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "C2NBID",
    },
    prefix: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "C2INPX",
    },
    seriesName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "C2NBDE",
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "C2YEA4",
    },
    startNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "C2NBLO",
    },
    finalNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "C2NBHI",
    },
    lastNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "C2NBNR",
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

module.exports = { NumberSeries, NumberSeriesInvoice };
