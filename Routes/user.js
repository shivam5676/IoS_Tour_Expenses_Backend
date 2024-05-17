const express = require("express");
const addExpense = require("../Controllers/user/addExpense");
const createTour = require("../Controllers/user/createTour");
const getTour = require("../Controllers/user/getTour");
const getTourExpenses = require("../Controllers/user/getTourExpenses");
const addTourDetails = require("../Controllers/user/addTourDetails");

const routes = express.Router();
routes.post("/saveExpense", addExpense);
routes.post("/createTour", createTour);
routes.post("/getTour", getTour);
routes.post("/getTourExpenses",getTourExpenses)
routes.post("/addDetails",addTourDetails)
module.exports = routes;
