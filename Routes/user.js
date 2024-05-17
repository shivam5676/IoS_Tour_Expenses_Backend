const express = require("express");
const addExpense = require("../Controllers/user/addExpense");
const createTour = require("../Controllers/user/createTour");
const getTour = require("../Controllers/user/getTour");

const routes = express.Router();
routes.post("/saveExpense", addExpense);
routes.post("/createTour", createTour);
routes.post("/getTour", getTour);
module.exports = routes;
