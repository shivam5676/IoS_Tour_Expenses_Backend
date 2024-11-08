require('dotenv').config();

module.exports = {
  development: {
    username: process.env.SQLUSERNAME,
    password: process.env.SQLSCHEMAPASSWORD,
    database: process.env.DB_NAME || "TourVoucher",
    host: process.env.SQLHOST,
    dialect: "mysql"
  }
};