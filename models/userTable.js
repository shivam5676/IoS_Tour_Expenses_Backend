const sequelize = require("sequelize");
const Sequelize = require("../util/database");

const userTable = Sequelize.define("users", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: false,
    primaryKey:true
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
});
// console.log("i am inside user table");

module.exports = userTable;
