const sequelize = require("sequelize");
const Sequelize = require("../util/database");
const VouchersDescription = Sequelize.define("voucherDescription", {
  purpose: {
    type: sequelize.STRING,
  },
  arrivalDate: {
    type: sequelize.STRING,
    allowNull: false,
  },
  departureDate: {
    type: sequelize.STRING,
    allowNull: false,
  },
  transport: {
    type: sequelize.STRING,
  },
  arrivalTime: {
    type: sequelize.STRING,
    allowNull: false,
  },
  departureTime: {
    type: sequelize.STRING,
    allowNull: false,
  },
  advanceCash: {
    type: sequelize.STRING,
  },
  DailyAllowance: {
    type: sequelize.STRING,
  },
  tourExpenses: { type: sequelize.STRING },
});
module.exports = VouchersDescription;
