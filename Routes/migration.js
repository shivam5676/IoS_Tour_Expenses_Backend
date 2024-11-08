const express = require("express");
const updateAdminApprovedAmount = require("../Controllers/updateAdminApprovedAmount");
const checkAdmin = require("../middleware/checkAdmin");
const routes = express.Router();

routes.get("/amountCopy",updateAdminApprovedAmount)

module.exports=routes