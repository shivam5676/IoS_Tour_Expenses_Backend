const express = require("express");
const createUser = require("../Controllers/admin/createUser");
const getUser = require("../Controllers/admin/getUser");
const getUsersVouchers = require("../Controllers/admin/getUsersVouchers");
const viewVoucher = require("../Controllers/admin/viewVoucher");
const getAllUser = require("../Controllers/admin/getAllUser");
const routes = express.Router();
routes.post("/createUser", createUser);
routes.post("/getAllUser", getAllUser);
routes.post("/getUsers", getUser);
routes.post("/getUserVouchers", getUsersVouchers);
routes.post("/viewVoucher", viewVoucher);

// routes.post("/allVouchers",) 
module.exports = routes;
