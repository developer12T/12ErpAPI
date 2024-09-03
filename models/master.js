const { sequelize, DataTypes } = require("../config/m3db");

const ItemFac = sequelize.define(
  "MITFAC",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "M9CONO",
    },
    M9FACI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "M9FACI",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "M9ITNO",
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "M9APPR",
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

const ItemMaster = sequelize.define(
  "MITMAS",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MMCONO",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMSTAT",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "MMITNO",
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMFUDS",
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "MMITTY",
    },
    MMITGR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMITGR",
    },
    MMITCL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMITCL",
    },
    itemGroup: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMCFI3",
    },
    netWeight: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMNEWE",
    },
    grossWeight: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMGRWE",
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

const ItemUnit = sequelize.define(
  "MITAUN",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MUCONO",
    },
    facType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MUAUTP",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "MUITNO",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "MUALUN",
    },
    factor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MUCOFA",
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

const Warehouse = sequelize.define(
  "MITWHL",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MWCONO",
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "MWWHLO",
    },
    warehouseName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MWWHNM",
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
const Locate = sequelize.define(
  "MITLOC",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MLCONO",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MLWHLO",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MLITNO",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MLWHSL",
    },
    lot: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MLBANO",
    },
    itemOnHand: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MLSTQT",
    },
    itemAllowcated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MLALQT",
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

const Balance = sequelize.define(
  "MITBAL",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MBCONO",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MBWHLO",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MBITNO",
    },
    itemPcs: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MBSTQT",
    },
    allowcateMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MBALMT",
    },
    itemAllowcated: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MBALQT",
    },
    itemAllowcatable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "MBAVAL",
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

const Policy = sequelize.define(
  "MHDIPO",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "EDCONO",
    },
    EDDPOL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "EDDPOL",
    },
    EDTX40: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "EDTX40",
    },
    EDTX15: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "EDTX15",
    },
    EDTRLV: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "EDTRLV",
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

const OOTYPE = sequelize.define(
  "OOTYPE",
  {
    OOCONO: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "OOCONO",
    },
    OOORTP: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: "OOORTP",
    },
    OOOT05: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OOOT05",
    },
    OOOT34: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OOOT34",
    },
    OOSPIC: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OOSPIC",
    },
    OODPOL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OODPOL",
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
  ItemFac,
  ItemMaster,
  ItemUnit,
  Warehouse,
  Locate,
  Balance,
  Policy,
  OOTYPE,
};
