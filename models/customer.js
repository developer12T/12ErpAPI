const { sequelize, DataTypes } = require("../config/m3db");

const Customer = sequelize.define(
  "OCUSMA",
  {
    customer_code: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCUNO",
    },
    customer_status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKSTAT",
    },
    money_type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCUCL",
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCUNM",
    },
    co_code: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCONO",
    },
    customer_address1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCUA1",
    },
    customer_address2: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCUA2",
    },
    customer_address3: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCUA3",
    },
    customer_poscode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKPONO",
    },
    customer_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKPHNO",
    },
    credit_term: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKTEPY",
    },
    co_type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKORTP",
    },
    warehouse: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKWHLO",
    },
    sdst: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKSDST",
    },
    customer_team: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCFC8",
    },
    OKCFC1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCFC1",
    },
    OKCFC3: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCFC3",
    },
    OKCFC6: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKCFC6",
    },
    sales_payer: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKPYNO",
    },
    credit_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OKCRL2",
    },
    taxno: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKVRNO",
    },
    sale_code: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OKSMCD",
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

const Shipping = sequelize.define(
  "OCUSAD",
  {
    OPCUNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUNO",
    },
    OPADID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPADID",
    },
    OPCUNM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUNM",
    },
    OPCUA1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA1",
    },
    OPCUA2: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA2",
    },
    OPCUA3: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA3",
    },
    OPPONO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPONO",
    },
    OPPHNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPHNO",
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

const Sale = sequelize.define(
  "CSYTAB",
  {
    CTSTKY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTSTKY",
    },
    CTTX40: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "CTTX40",
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
  Customer,
  Shipping,
  Sale,
};
