const express = require("express");
const routes = express.Router();
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
const checkToken = require("../middleware/checkToken");
const checkAdmin = require("../middleware/checkAdmin");
const postComment = require("../Controllers/admin/PostComment");
const checkSupervisor = require("../middleware/checkSupervisor");
// const { default: checkSupervisor } = require("../middleware/checkSupervisor");

routes.post("/createUser", checkToken, checkAdmin, createUser);
routes.post("/getAllUser", checkToken, checkAdmin, getAllUser);
routes.post("/getUser", checkToken, checkAdmin, getUser);
routes.post("/getUserVouchers", checkToken, getUsersVouchers);
routes.post("/viewVoucher", checkAdmin, checkToken, checkAdmin, viewVoucher);
routes.post("/allVoucher", checkToken, checkAdmin, getAllVoucher);
routes.post("/year", checkToken, checkAdmin, getYearData);
routes.post("/user", checkToken, checkAdmin, getUserReport);

routes.post("/trackVoucher", checkToken, trackVoucherStatus);
routes.post(
  "/acceptVoucher",
  checkToken,
  checkAdmin,
  checkSupervisor,
  acceptVoucher
);
routes.post("/rejectVoucher", checkToken, checkAdmin, rejectVoucher);
routes.post("/postComment", checkToken, checkAdmin, postComment);

// routes.post("/allVouchers",)
module.exports = routes;
