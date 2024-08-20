const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const mssql = require("mssql");
const {
  ANTDATABASE,
  ANTHOST,
  ANTUSER,
  ANTPASSWORD,
} = require("../config/index");
const sequelize = new Sequelize(ANTDATABASE, ANTUSER, ANTPASSWORD, {
  dialect: "mssql",
  host: ANTHOST,
  //   schema: "AntDB",
  dialectOptions: {
    options: {
      enableArithAbort: false,
      encrypt: false,
      cryptoCredentialsDetails: {
        minVersion: "TLSv1",
        // minVersion: 'TLSv1_2'
      },
    },
  },
});

module.exports = {
  sequelize: sequelize,
  DataTypes: DataTypes,
  QueryTypes: QueryTypes,
  mssql: mssql,
};
