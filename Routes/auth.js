const express = require("express");
const { Login } = require("../Controllers/auth");
const routes = express.Router();
routes.post("/login",Login);
module.exports = routes;
