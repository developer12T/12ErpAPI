const { sequelize, DataTypes } = require("../config/antdb");

const UserAnt = sequelize.define(
  "hs_User_copy1",
  {
    Col_LoginName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Col_PWord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Col_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Col_o_JobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Col_DeptInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Col_ECard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// sequelize.sync({force:false,alter:false})

module.exports = { UserAnt };
