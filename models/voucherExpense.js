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
});
module.exports = voucherExpense;
