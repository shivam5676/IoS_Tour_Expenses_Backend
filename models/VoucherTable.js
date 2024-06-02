const sequelize = require("sequelize");
const Sequelize = require("../util/database");
const Vouchers = Sequelize.define("Vouchers", {
  // status: {
  //   type: sequelize.STRING,
  //   // defaultValue: "pending",
  // },
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
  currency: {
    type: sequelize.STRING,
  },
});
module.exports = Vouchers;
