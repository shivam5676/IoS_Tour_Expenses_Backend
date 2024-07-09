const sequelize = require("sequelize");
require("dotenv").config();
const fs = require('fs');
const path = require('path');
// const db = new sequelize("TourVoucher", process.env.SQLUSERNAME,  process.env.SQLSCHEMAPASSWORD, {
//   dialect: "mysql",
//   host:  process.env.SQLHOST,
// });

const caPath = path.resolve(__dirname, '../', 'ca.pem');

const db = new sequelize("TourVoucher", process.env.SQLUSERNAME, process.env.SQLSCHEMAPASSWORD, {
  dialect: "mysql",
  host: process.env.SQLHOST,
  // logging:false,
  // port: 19424, // Specify the custom port
  // dialectOptions: {
  //   ssl: {
  //     ca: fs.readFileSync(caPath)
  //   }
  // }
});
module.exports = db;
