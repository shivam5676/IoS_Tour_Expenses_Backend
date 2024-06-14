const sequelize = require("sequelize");
require("dotenv").config();
const db = new sequelize("TourVoucher", process.env.SQLSCHEMANAME,  process.env.SQLSCHEMAPASSWORD, {
  dialect: "mysql",

  host:  process.env.SQLHOST,
  
});

module.exports = db;
