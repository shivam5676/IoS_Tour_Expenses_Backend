const express = require("express");
const addExpense = require("../Controllers/user/addExpense");
const createTour = require("../Controllers/user/createTour");
const getTour = require("../Controllers/user/getTour");
const getTourExpenses = require("../Controllers/user/getTourExpenses");
const addTourDetails = require("../Controllers/user/addTourDetails");
const checkToken = require("../middleware/checkToken");
const getPendingVoucher = require("../Controllers/user/getPendingVouchers");
const checkSupervisor = require("../middleware/checkSupervisor");
const deleteExpense = require("../Controllers/user/deleteExpense");
const updateExpense = require("../Controllers/user/updateExpense");

const routes = express.Router();
routes.post("/saveExpense", checkToken, addExpense);
routes.post("/createTour", checkToken, createTour);
routes.post("/getTour", checkToken, getTour);
routes.post("/getTourExpenses", checkToken, getTourExpenses);
routes.post("/addDetails", checkToken,checkSupervisor, addTourDetails);
routes.post("/getPendingVouchers", checkToken, getPendingVoucher);
routes.post("/deleteExpense",checkToken,deleteExpense)
routes.post("/updateExpense", checkToken, updateExpense);

module.exports = routes;
