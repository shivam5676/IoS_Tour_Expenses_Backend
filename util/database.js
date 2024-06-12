const sequelize = require("sequelize");
const db = new sequelize("TourVoucher", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;
