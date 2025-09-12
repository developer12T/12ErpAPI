const { sequelize, DataTypes } = require('../config/m3db')

const Promotion = sequelize.define(
  'OPROMH',
  {
    FZCONO: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FZCONO'
    },
    promotionCode: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FZPIDE'
    },
    FZTX15: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'FZTX15'
    },
    promotionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'FZTX40'
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

const PromotionStore = sequelize.define(
  'OPROMC',
  {
    FBCONO: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      field: 'FBCONO'
    },
    FBDIVI: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      field: 'FBDIVI'
    },
    FBCUNO: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      field: 'FBCUNO'
    },
    FBCUCL: { type: DataTypes.STRING, allowNull: true, field: 'FBCUCL' },
    FBSMCD: { type: DataTypes.STRING, allowNull: true, field: 'FBSMCD' },
    FBORTP: { type: DataTypes.STRING, allowNull: true, field: 'FBORTP' },
    FBWHLO: { type: DataTypes.STRING, allowNull: true, field: 'FBWHLO' }, // ← คุณส่งมา ต้องมี
    FBSDST: { type: DataTypes.STRING, allowNull: true, field: 'FBSDST' },
    FBCSCD: { type: DataTypes.STRING, allowNull: true, field: 'FBCSCD' },
    FBPYNO: { type: DataTypes.STRING, allowNull: true, field: 'FBPYNO' },
    FBFRE1: { type: DataTypes.STRING, allowNull: true, field: 'FBFRE1' },
    FBPONO: { type: DataTypes.STRING, allowNull: true, field: 'FBPONO' },
    FBCFC1: { type: DataTypes.STRING, allowNull: true, field: 'FBCFC1' },
    FBCFC3: { type: DataTypes.STRING, allowNull: true, field: 'FBCFC3' },
    FBECAR: { type: DataTypes.STRING, allowNull: true, field: 'FBECAR' },
    FBFVDT: { type: DataTypes.INTEGER, allowNull: true, field: 'FBFVDT' }, // แนะนำเก็บเป็น CHAR(8) 'YYYYMMDD'
    FBLVDT: { type: DataTypes.INTEGER, allowNull: true, field: 'FBLVDT' },
    FBRGDT: { type: DataTypes.INTEGER, allowNull: true, field: 'FBRGDT' },
    FBRGTM: { type: DataTypes.INTEGER, allowNull: true, field: 'FBRGTM' }, // เวลา 'HHmmss'
    FBLMDT: { type: DataTypes.INTEGER, allowNull: true, field: 'FBLMDT' }, // อย่าใช้ Date.now() ถ้าคอลัมน์เป็น CHAR(8)
    FBCHNO: { type: DataTypes.INTEGER, allowNull: true, field: 'FBCHNO' },
    FBCHID: { type: DataTypes.STRING, allowNull: true, field: 'FBCHID' },
    FBPRI2: { type: DataTypes.INTEGER, allowNull: true, field: 'FBPRI2' }
  },
  {
    modelName: 'OPROMC',
    schema: 'MVXJDTA',
    tableName: 'OPROMC',
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false
  }
)

module.exports = { Promotion, PromotionStore }
