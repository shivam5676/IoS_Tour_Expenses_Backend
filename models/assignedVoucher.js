const sequelize = require("sequelize");
const Sequelize = require("../util/database");

const assignedVoucher = Sequelize.define("assignedVoucher", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  assignedTo: {
    type: sequelize.STRING,
    // allowNull: false,
  },status:{
    type: sequelize.STRING,

  }
});
// console.log("i am inside user table");

module.exports = assignedVoucher;
