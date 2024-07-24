const { sequelize, DataTypes } = require("../config/m3db");

const Promotion = sequelize.define(
  "OPROMH",
  {
    FZCONO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "FZCONO",
    },
    promotionCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "FZPIDE",
    },
    FZTX15: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "FZTX15",
    },
    promotionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "FZTX40",
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

module.exports = Promotion;
