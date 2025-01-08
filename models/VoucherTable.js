const sequelize = require("sequelize");
const Sequelize = require("../util/database");
const Vouchers = Sequelize.define("Vouchers", {
  chatGroup: {
    type: sequelize.STRING,
    allowNull: true,        // Change to `false` if the column should be mandatory
    defaultValue: null 
  },
  statusType: {
    type: sequelize.STRING,
    // allowNull: false,
  },
  tourLocation: {
    type: sequelize.STRING,
    allowNull: false,
  },
  tourDate: {
    type: sequelize.STRING,
    allowNull: false,
  },
  sender: {
    type: sequelize.STRING,
    // allowNull: false,
  },
  comment: {
    type: sequelize.STRING,
    // allowNull: false,
  },
  assignedTo: {
    type: sequelize.STRING,
  },
  assignedName: {
    type: sequelize.STRING,
  },
  currency: {
    type: sequelize.STRING,
  },
  exchangeRates:{
    type:sequelize.FLOAT
  }
});
module.exports = Vouchers;
