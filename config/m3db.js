const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const mssql = require("mssql");

const sequelize = new Sequelize("M3FDBTST", "sa", "One2@@", {
  // const sequelize = new Sequelize('M3FDBTST', 'sa', 'One2@@', {
  dialect: "mssql",
  host: "192.168.2.74",
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
