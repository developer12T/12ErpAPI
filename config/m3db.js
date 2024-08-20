const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const mssql = require("mssql");
const { M3DATABASE, M3HOST, M3USER, M3PASSWORD } = require("../config/index");

const sequelize = new Sequelize(M3DATABASE, M3USER, M3PASSWORD, {
  // const sequelize = new Sequelize('M3FDBTST', 'sa', 'One2@@', {
  dialect: "mssql",
  host: M3HOST,
  schema: "MVXJDTA",
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
  define: {
    noPrimaryKey: true,
  },
});

module.exports = {
  sequelize: sequelize,
  DataTypes: DataTypes,
  QueryTypes: QueryTypes,
  mssql: mssql,
};
