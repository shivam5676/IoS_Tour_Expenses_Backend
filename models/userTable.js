const sequelize = require("sequelize");
const Sequelize = require("../util/database");

const userTable = Sequelize.define("users", {
  firstName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  isAdmin: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});
console.log("i am inside user table");
module.exports = userTable;
