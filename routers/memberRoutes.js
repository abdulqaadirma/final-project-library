const express = require("express");
const memberRouter = express.Router();
const memberController = require("../controllers/memberController");
const authenticateMiddleware = require("../controllers/authenticateMiddleware");

memberRouter.get("/memberDashboard", authenticateMiddleware.isMemberMiddleware, memberController.memberDashboard);


module.exports = memberRouter;