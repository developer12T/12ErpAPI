const { sequelize, DataTypes } = require('../config/m3db')

const ItemFac = sequelize.define(
  'MITFAC',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'M9CONO'
    },
    M9FACI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'M9FACI'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'M9ITNO'
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'M9APPR'
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

const ItemMaster = sequelize.define(
  'MITMAS',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'MMCONO'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMSTAT'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MMITNO'
    },
    itemDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMITDS'
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMFUDS'
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MMITTY'
    },
    MMITGR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMITGR'
    },
    itemClass: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMITCL'
    },
    itemGroup: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMCFI3'
    },
    netWeight: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMNEWE'
    },
    grossWeight: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMGRWE'
    },
    MMUNMS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MMUNMS'
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

const ItemUnit = sequelize.define(
  'MITAUN',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'MUCONO'
    },
    facType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MUAUTP'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MUITNO'
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MUALUN'
    },
    factor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MUCOFA'
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

const Warehouse = sequelize.define(
  'MITWHL',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'MWCONO'
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'MWWHLO'
    },
    warehouseName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MWWHNM'
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
const Locate = sequelize.define(
  'MITLOC',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'MLCONO'
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MLWHLO'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MLITNO'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MLWHSL'
    },
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MLBANO'
    },
    itemOnHand: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MLSTQT'
    },
    itemallocated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MLALQT'
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

const Balance = sequelize.define(
  'MITBAL',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'MBCONO'
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MBWHLO'
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'MBITNO'
    },
    itemPcs: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MBSTQT'
    },
    allocateMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MBALMT'
    },
    itemallocated: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'MBALQT'
    },
    itemAllowcatable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MBAVAL'
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

const Policy = sequelize.define(
  'MHDIPO',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'EDCONO'
    },
    EDDPOL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'EDDPOL'
    },
    EDDNID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'EDDNID'
    },
    EDTX40: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'EDTX40'
    },
    EDTX15: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'EDTX15'
    },
    EDTRLV: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'EDTRLV'
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

const OOTYPE = sequelize.define(
  'OOTYPE',
  {
    OOCONO: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'OOCONO'
    },
    OOORTP: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'OOORTP'
    },
    OOOT05: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OOOT05'
    },
    OOOT34: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OOOT34'
    },
    OOSPIC: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OOSPIC'
    },
    OODPOL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'OODPOL'
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

const MGTYPE = sequelize.define(
  'MGTYPE',
  {
    YXCONO: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'YXCONO'
    },
    YXTRTP: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'YXTRTP'
    },
    YXDPOL: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'YXDPOL'
    },
    YXTX40: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YXTX40'
    },
    YXTTYP: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YXTTYP'
    },
    YXTTID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YXTTID'
    },
    YXTTSI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YXTTSI'
    },
    YXNBID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YXNBID'
    },
    YXFSQ3: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'YXFSQ3'
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

const OODFLT = sequelize.define(
  'OODFLT',
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'UJCONO'
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'UJORTP'
    },
    UJPLTB: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'UJPLTB'
    },
    UJDISY: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'UJDISY'
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

module.exports = {
  ItemFac,
  ItemMaster,
  ItemUnit,
  Warehouse,
  Locate,
  Balance,
  Policy,
  OOTYPE,
  MGTYPE,
  OODFLT
}
