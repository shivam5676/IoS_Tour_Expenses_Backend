const sequelize = require("sequelize");
const db = new sequelize("TourVoucher", "root", "12345678", {
  dialect: "mysql",
  host: "localhost",
});

module.exports=db
