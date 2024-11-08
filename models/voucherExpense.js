const sequelize = require("sequelize");
const Sequelize = require("../util/database");
const voucherExpense = Sequelize.define("voucherExpenses", {
  description: {
    type: sequelize.STRING,
  },
  expenseType: {
    type: sequelize.STRING,
  },
  date: { type: sequelize.STRING },
  paymentType: {
    type: sequelize.STRING,
  },
  Amount: {
    type: sequelize.STRING,
  },
  voucherNo: { type: sequelize.STRING, defaultValue: "no voucher attached" },
  imagePath: {
    type: sequelize.STRING,
  },
  adminApprovedAmount: {
    type: sequelize.STRING, // Adjust the type as needed
    allowNull: true,        // Change to `false` if the column should be mandatory
    defaultValue: null
  },
  adminApprovedAmountRemark:{
    type: sequelize.STRING, // Adjust the type as needed
    allowNull: true,        // Change to `false` if the column should be mandatory
    defaultValue: null   
  }
});
module.exports = voucherExpense;
