const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const mssql = require("mssql");

const sequelize = new Sequelize("AntDB", "sa", "F@753951", {
  dialect: "mssql",
  host: "192.168.0.3",
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
