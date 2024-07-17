const { sequelize, DataTypes } = require("../config/m3db");
const NumberSeries = sequelize.define(
  "CSYNBR",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "CNCONO",
    },
    series: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CNNBID",
    },
    seriesType: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = NumberSeries;
