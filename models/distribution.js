const { sequelize, DataTypes } = require('../config/m3db')
const MGHEAD = sequelize.define(
  'MGHEAD',
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'MGCONO'
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'MGTRNR'
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGTRTP'
    },
    MGFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGFACI'
    },
    MGATHS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGRORN'
    },
    MGRORN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGRORN'
    },
    MGRESP: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGRESP'
    },
    MGATHS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGATHS'
    },
    statusLow: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGTRSL'
    },
    statusHigh: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGTRSH'
    },
    MGPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGPRIO'
    },
    tranferDate: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGTRDT'
    },
    MGRIDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGRIDT'
    },
    MGTRTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'MGTRTM'
    },
    MGRIDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'MGRIDT'
    },
    MGRITM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'MGRITM'
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'MGTWSL'
    },
    towarehouse: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGTWLO'
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGREMK'
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGWHLO'
    },
    MGGRWE: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGGRWE'
    },
    MGDEPT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGDEPT'
    },
    MGNUGL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGNUGL'
    },
    MGRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGRGDT'
    },
    MGRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGRGTM'
    },
    MGLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGLMDT'
    },
    MGCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGCHNO'
    },
    MGCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGCHID'
    },
    MGLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGLMTS'
    },
    MGGSR3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MGGSR3'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)
const MGLINE = sequelize.define(
  'MGLINE',
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRCONO'
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'MRTRNR'
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'MRPONR'
    },
    MRTRSH: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRSH'
    },
    MRWHLO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRWHLO'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      field: 'MRITNO'
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRITDS'
    },
    MRGRWE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'MRGRWE'
    },
    MRTRDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRDT'
    },
    MRRPDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRRPDT'
    },
    MRSTAS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRSTAS'
    },
    itemQty: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRQT'
    },
    MRTRSH: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRSH'
    },
    itemUnit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRALUN'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRWHSL'
    },
    toLocation: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTWSL'
    },
    itemLot: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRBANO'
    },
    itemStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRSH'
    },
    MRRPQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRRPQT'
    },
    MRACQT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRACQT'
    },
    MRSTCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRSTCD'
    },
    MRCUCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRCUCD'
    },
    MRPRDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRPRDT'
    },
    MRNUCR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRNUCR'
    },
    MRRORN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRRORN'
    },
    MRRESP: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRRESP'
    },
    MRTIHM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTIHM'
    },
    MRRGDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRRGDT'
    },
    MRRGTM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRRGTM'
    },
    MRLMDT: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRLMDT'
    },
    MRCHNO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRCHNO'
    },
    MRCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRCHID'
    },
    MRLMTS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRLMTS'
    },
    MRPRIO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRPRIO'
    },
    MRTRPR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRPR'
    },
    MRTRQA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MRTRQA'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)
const MGDADR = sequelize.define(
  'MGDADR',
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'MACONO'
    },
    orderNo: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: true,
      field: 'MATRNR'
    },
    MAADK1: {
      type: DataTypes.NUMBER,
      allowNull: true,
      primaryKey: true,
      field: 'MAADK1'
    },

    MASUNO: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MASUNO'
    },
    MAADID: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAADID'
    },
    MACONM: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MACONM'
    },
    MAADR1: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAADR1'
    },
    MAADR2: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAADR2'
    },
    MAADR3: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAADR3'
    },
    MAADR4: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAADR4'
    },
    MAPONO: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAPONO'
    },
    MACSCD: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MACSCD'
    },
    MAADVI: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAADVI'
    },
    MAOREF: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAOREF'
    },
    MAYREF: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAYREF'
    },
    MATXID: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MATXID'
    },
    MATOWN: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MATOWN'
    },
    MAECAR: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MAECAR'
    },
    MARGDT: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MARGDT'
    },
    MARGTM: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MARGTM'
    },
    MALMDT: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MALMDT'
    },
    MACHNO: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MACHNO'
    },
    MACHID: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: 'MACHID'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)

const CIADDR = sequelize.define(
  'CIADDR',
  {
    coNo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      field: 'OACONO'
    },
    OAADK1: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
      field: 'OAADK1'
    },
    OAADK2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAADK2'
    },
    OACONM: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OACONM'
    },
    OAADR1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAADR1'
    },
    OAADR2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAADR2'
    },
    OAADR3: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAADR3'
    },
    OAADR4: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAADR4'
    },
    OACSCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OACSCD'
    },
    OAPONO: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAPONO'
    },
    OAECAR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OAECAR'
    },
    OATXID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'OATXID'
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)


















module.exports = {
  MGHEAD,
  MGLINE,
  MGDADR,
  CIADDR
}
