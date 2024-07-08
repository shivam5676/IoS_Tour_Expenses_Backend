const { Sequelize, DataTypes } = require("sequelize");
//  const sequelize = require("../config/connection");
 const Machine = require("./machine");
//  const Flavor = require("./flavor");
const db = require("../util/database");
 const MachineWiseFlavor = db.define("machineWiseFlavor",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique:true
    }
 })
 module.exports=MachineWiseFlavor