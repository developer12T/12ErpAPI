const { sequelize, DataTypes } = require('../config/m3db')
const MoveMent = sequelize.define(
  'MITTRA',
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MTCONO'
    },
    towarehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MTWHLO'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MTITNO'
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MTRIDN'
    },
    MTWHSL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MTWHSL'
    },
    itemLot: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MTBANO'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false
  }
)

module.exports = MoveMent
