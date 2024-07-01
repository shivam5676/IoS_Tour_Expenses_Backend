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
const getSuperVisor = require("../Controllers/admin/getSupervisorList");
const reAssignVoucher = require("../Controllers/admin/reassignVoucher");
const getPaymentVoucher = require("../Controllers/admin/getPAymentVoucher");
const deleteUser = require("../Controllers/admin/deleteUser");
const getAllTimeData = require("../Controllers/admin/getAllTimeData");
const closeVoucher = require("../Controllers/admin/closeVoucher");
const assignAdmin = require("../Controllers/admin/assignAdmin");
const superAdmin = require("../middleware/superAdmin");
const deleteAdmin = require("../Controllers/admin/deleteAdmin");
const TokenRefresher = require("../middleware/tokenRefresher");
// const { default: checkSupervisor } = require("../middleware/checkSupervisor");

routes.post("/createUser", checkToken, checkSupervisor, checkAdmin, createUser);
routes.post("/getAllUser", checkToken, checkSupervisor, checkAdmin, getAllUser);
routes.post("/getUser", checkToken, checkSupervisor, checkAdmin, getUser);
routes.post("/getUserVouchers", checkToken, checkSupervisor, getUsersVouchers);
routes.post(
  "/viewVoucher",
  checkToken,
  checkSupervisor,
  checkAdmin,
  viewVoucher
);
routes.post(
  "/allVoucher",
  checkToken,
  checkSupervisor,
  checkAdmin,
  getAllVoucher
);
routes.post("/year", checkToken, checkSupervisor, checkAdmin, getYearData);
routes.post("/user", checkToken, checkSupervisor, checkAdmin, getUserReport);

routes.post("/trackVoucher", checkToken, trackVoucherStatus);
routes.post(
  "/acceptVoucher",
  checkToken,
  checkAdmin,
  checkSupervisor,
  acceptVoucher
);
routes.post(
  "/closeVoucher",
  checkToken,
  checkAdmin,
  checkSupervisor,
  closeVoucher
);
routes.post(
  "/rejectVoucher",
  checkToken,
  checkSupervisor,
  checkAdmin,
  rejectVoucher
);
routes.post(
  "/postComment",
  checkToken,
  checkSupervisor,
  checkAdmin,
  postComment
);
routes.post("/getSuperVisor", checkToken, checkAdmin, getSuperVisor);
routes.post("/reAssign", checkToken, checkAdmin, reAssignVoucher);
routes.post("/assignAsAdmin", checkToken, superAdmin, assignAdmin);
routes.post("/removeAsAdmin", checkToken, superAdmin, deleteAdmin);

routes.post("/getPaymentVoucher", checkToken, checkAdmin, getPaymentVoucher);
routes.post("/deleteUser", checkToken, checkAdmin, deleteUser);
routes.post("/allTime", checkToken, checkAdmin, getAllTimeData);
// routes.post("/sessionVerify", checkToken);
// routes.post("/sessionRefresh", TokenRefresher);
module.exports = routes;
