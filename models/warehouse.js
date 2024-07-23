const { sequelize, DataTypes } = require("../config/antdb");

const WareHosue = sequelize.define(
  "MITWHL",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWCONO",
    },
    warehouseLo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWWHLO",
    },
    warehouseName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWWHNM",
    },
    MWDIVI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWDIVI",
    },
    MWFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWFACI",
    },
    warehouseType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWWHTY",
    },
    // coNo: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   field: "MWDIVI",
    // },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
  }
);
