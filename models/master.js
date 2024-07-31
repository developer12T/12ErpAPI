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
      field: "M9FACI",
    },
    itemNo: {
      type: DataTypes.STRING,
      allowNull: false,
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
    itemNo: {
      type: DataTypes.STRING,
      allowNull: false,
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
    netWight: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MMNEWE",
    },
    grossWight: {
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
    itemNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "MUITNO",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = {
  ItemFac,
  ItemMaster,
  ItemUnit,
  Warehouse,
  Locate,
  Balance,
};
