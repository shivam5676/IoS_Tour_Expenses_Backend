const { Sequelize, DataTypes } = require("sequelize");
const db = require("../util/database");

const Machines = db.define("machine", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    unique: true,
  },
  machineId: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  division: {
    type: DataTypes.STRING,
    field: "division",
  },
  location: {
    type: DataTypes.STRING,
    field: "location",
  },
  machineStatus: {
    type: DataTypes.ENUM("Active", "Inactive"),
    field: "machine_status",
  },
  mode: {
    type: DataTypes.ENUM("Web order only", "Web and KIOSK orders", "No orders"),
    field: "mode",
  },
  boardNumber: {
    type: DataTypes.STRING,
    field: "board_Number",
  },
  dateOfManufacturing: {
    type: DataTypes.DATE,
    field: "date_of_manufacturing",
  },
  chasisID: {
    type: DataTypes.STRING,
    field: "chasis_ID",
  },
  Discount: {
    type: DataTypes.INTEGER,
    field: "discount",
  },
  startTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "start_time",
  },
  lastRefillTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "last_refill_time",
  },
  isDeactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_deactive",
  },
});

module.exports = Machines;
