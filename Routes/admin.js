const express = require("express");
const createUser = require("../Controllers/admin/createUser");
const getUser = require("../Controllers/admin/getUser");
const getUsersVouchers = require("../Controllers/admin/getUsersVouchers");
const viewVoucher = require("../Controllers/admin/viewVoucher");
const getAllUser = require("../Controllers/admin/getAllUser");
const getAllVoucher = require("../Controllers/admin/getAllVoucher");
const getYearData = require("../Controllers/admin/getYearData");
const trackVoucherStatus = require("../Controllers/admin/trackVoucherStatus");
const acceptVoucher = require("../Controllers/admin/acceptVoucher");
const rejectVoucher = require("../Controllers/admin/rejectVoucher");
const getUserReport = require("../Controllers/admin/getUserReport");
const routes = express.Router();
routes.post("/createUser", createUser);
routes.post("/getAllUser", getAllUser);
routes.post("/getUser", getUser);
routes.post("/getUserVouchers", getUsersVouchers);
routes.post("/viewVoucher", viewVoucher);
routes.post("/allVoucher", getAllVoucher);
routes.post("/year", getYearData);
routes.post("/user", getUserReport);

routes.post("/trackVoucher", trackVoucherStatus);
routes.post("/acceptVoucher", acceptVoucher);
routes.post("/rejectVoucher", rejectVoucher);

// routes.post("/allVouchers",)
module.exports = routes;
