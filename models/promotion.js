const { sequelize, DataTypes } = require("../config/m3db");

const Promotion = sequelize.define(
  "OPROMH",
  {
    promotionCode: {
      type: DataTypes.STRING,
      allowNull: true ,
      field: "FZPIDE",
    },
    promotionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "FZTX40",
    },
    FZCONO: {
        type: DataTypes.STRING,
        allowNull: true ,
        field: "FZCONO",
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

module.exports = {
  Promotion,
};
