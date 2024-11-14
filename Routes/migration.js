const express = require("express");
const updateAdminApprovedAmount = require("../Controllers/updateAdminApprovedAmount");
const checkAdmin = require("../middleware/checkAdmin");
const checkToken = require("../middleware/checkToken");
const routes = express.Router();

routes.get("/amountCopy",checkToken,checkAdmin,updateAdminApprovedAmount)

module.exports=routes