const sequelize = require("sequelize");
const Sequelize = require("../util/database");

const userTable = Sequelize.define("users", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
  },
  firstName: {
    type: sequelize.STRING,
    // allowNull: false,
  },
  lastName: {
    type: sequelize.STRING,
    // allowNull: false,
  },
  mobile: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
    // allowNull: false,
    unique: true,
  },
  isAdmin: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
  designation: {
    type: sequelize.STRING,
    // allowNull: false,
  },
  supervisor: {
    type: sequelize.BOOLEAN,
  },
  profilePic: {
    type: sequelize.STRING,
  },
  paymentAdmin: {
    type: sequelize.BOOLEAN, // Adjust the type as needed
    allowNull: true, // Change to `false` if the column should be mandatory
    defaultValue: false, // Set a default value if needed
  },
  voucherVerifier: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
  },
});
// console.log("i am inside user table");

module.exports = userTable;
