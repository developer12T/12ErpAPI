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
      allowNull: true,
      primaryKey: true,
      field: 'FBCONO'
    }
  },
  {
    FBDIVI: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBDIVI'
    }
  },
  {
    FBCUNO: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCUNO'
    }
  },
  {
    FBPIDE: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBPIDE'
    }
  },
  {
    FBCUCL: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCUCL'
    }
  },
  {
    FBSMCD: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBSMCD'
    }
  },
  {
    FBORTP: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBORTP'
    }
  },
  {
    FBSDST: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBSDST'
    }
  },
  {
    FBCSCD: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCSCD'
    }
  },
  {
    FBPYNO: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBPYNO'
    }
  },
  {
    FBFRE1: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBFRE1'
    }
  },
  {
    FBPONO: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBPONO'
    }
  },
  {
    FBCFC1: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCFC1'
    }
  },
  {
    FBCFC3: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCFC3'
    }
  },
  {
    FBECAR: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBECAR'
    }
  },
  {
    FBFVDT: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBFVDT'
    }
  },
  {
    FBLVDT: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBLVDT'
    }
  },
  {
    FBRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBRGDT'
    }
  },
  {
    FBLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBLMDT'
    }
  },
  {
    FBCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCHNO'
    }
  },
  {
    FBCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBCHID'
    }
  },
  {
    FBPRI2: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'FBPRI2'
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

module.exports = { Promotion, PromotionStore }
