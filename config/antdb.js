const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const mssql = require("mssql");
const {
  ANT_DATABASE,
  ANT_HOST,
  ANT_USER,
  ANT_PASSWORD,
} = require("../config/index");
const sequelize = new Sequelize(ANT_DATABASE, ANT_USER, ANT_PASSWORD, {
  dialect: "mssql",
  host: ANT_HOST,
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
