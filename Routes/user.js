const express = require("express");
const addExpense = require("../Controllers/user/addExpense");

const routes = express.Router();
 routes.post("/saveExpense",addExpense)
 module.exports=routes