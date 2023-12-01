const express = require("express");
const LoginController = require("../config/LoginController");
const auth_router = express.Router();


auth_router.post("/login", LoginController.login);

module.exports = auth_router;