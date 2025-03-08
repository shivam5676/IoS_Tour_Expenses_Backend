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
const updateAdminApprovedAmount = require("../Controllers/updateAdminApprovedAmount");
const updateExpenseAdmin = require("../Controllers/admin/updateExpenseAdmin");
// const { default: checkSupervisor } = require("../middleware/checkSupervisor");
const multer = require("multer");
const changeStatus = require("../Controllers/admin/changeStatus");
const getClosedVoucher = require("../Controllers/admin/getClosedVoucher");
const assignVoucherToPaymentAdmin = require("../middleware/assignVoucherToPaymentAdmin");
const checkPaymentAdmin = require("../middleware/checkPaymentAdmin");
const givePaymentReviewPermission = require("../Controllers/admin/givePaymentReviewPermission");
const removePaymentReviewPermission = require("../Controllers/admin/removePaymentREviewPErmission");
const VerifyVoucher = require("../Controllers/admin/verifyVoucher");
const assignVoucherToVerifier = require("../middleware/assignVoucherToVerifier");
const giveVoucherVerifyPermission = require("../Controllers/admin/giveVoucherVerifyPermission");
const removeVoucherVerifyPermission = require("../Controllers/admin/removeVoucherVerifyPermission");
const upload = multer();

// routes.post("/createUser", checkToken, checkAdmin, createUser);
routes.post("/getAllUser", checkToken, getAllUser);
routes.post("/getUser", checkToken, getUser);
routes.post("/getUserVouchers", checkToken, getUsersVouchers);

routes.post(
  "/viewVoucher",
  checkToken,

  viewVoucher
);
routes.post(
  "/allVoucher",
  checkToken,

  getAllVoucher
);
routes.post("/year", checkToken, getYearData);
routes.post("/user", checkToken, getUserReport);

routes.post("/trackVoucher", checkToken, trackVoucherStatus);
routes.post("/verifyVoucher",checkToken,assignVoucherToPaymentAdmin,VerifyVoucher)
routes.post(
  "/acceptVoucher",

  checkToken,

  acceptVoucher
);
routes.post(
  "/closeVoucher",
  checkToken,

  closeVoucher
);
routes.post(
  "/rejectVoucher",
  checkToken,

  rejectVoucher
);
routes.post(
  "/postComment",
  checkToken,

  // checkAdmin,
  postComment
);
routes.post(
  "/changeStatus",
  checkToken,

  changeStatus
);
routes.post("/getSuperVisor", checkToken, getSuperVisor);
routes.post("/reAssign", checkToken, reAssignVoucher);
routes.post("/assignAsAdmin", checkToken, superAdmin, assignAdmin);
routes.post("/removeAsAdmin", checkToken, superAdmin, deleteAdmin);
routes.post("/givePaymentHandlingPermission", checkToken, superAdmin, givePaymentReviewPermission);
routes.post("/removePaymentHandlingPermission", checkToken, superAdmin, removePaymentReviewPermission);
routes.post("/giveVoucherVerifyPermission", checkToken,  giveVoucherVerifyPermission);
routes.post("/removeVoucherVerifyPermission", checkToken,  removeVoucherVerifyPermission);
routes.post("/getPaymentVoucher", checkToken, getPaymentVoucher);
routes.post("/getClosedVoucher", checkToken, getClosedVoucher);
routes.post("/deleteUser", checkToken, deleteUser);
routes.post("/allTime", checkToken, getAllTimeData);
routes.post(
  "/adminApprovedExpense",
  upload.single("billImage"),
  checkToken,
  checkAdmin,
  updateExpenseAdmin
);
// routes.post("/sessionVerify", checkToken);
// routes.post("/sessionRefresh", TokenRefresher);
module.exports = routes;
