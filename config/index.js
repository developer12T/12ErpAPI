require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  SERVER: process.env.SERVER,
  HOST: process.env.HOST,
  M3HOST: process.env.M3HOST,
  M3DATABASE: process.env.M3DATABASE,
  M3USER: process.env.M3USER,
  M3PASSWORD: process.env.M3PASSWORD,
  ANTHOST: process.env.ANTHOST,
  ANTDATABASE: process.env.ANTDATABASE,
  ANTUSER: process.env.ANTUSER,
  ANTPASSWORD: process.env.ANTPASSWORD,
};
