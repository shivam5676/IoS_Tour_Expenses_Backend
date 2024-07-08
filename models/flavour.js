const {  DataTypes, Sequelize } = require("sequelize");
// const sequelize = require('../config/connection');
const db = require("../util/database");
// const MachineWiseFlavor=require('./machineWiseFlavor')
const Flavor = db.define("flavor", {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique:true,
      allowNull:false
  },
  recipie: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    uniqueValue: true,
    allowNull: false,
  },
  sequence: {
    type: DataTypes.INTEGER,
  },
  imageSrc: {
    type: DataTypes.BLOB("long"),
    field: "image_Src",
  },
  title: {
    type: DataTypes.STRING,
    field: "title",
  },
  rate: {
    type: DataTypes.INTEGER,
    field: "rate",
  },
  available: {
    type: DataTypes.BOOLEAN,
    field: "available",
  }
});

module.exports = Flavor;
