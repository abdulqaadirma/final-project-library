const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const authenticateMiddleware = require("../controllers/authenticateMiddleware");

adminRouter.get("/dashboard", authenticateMiddleware.isAdminOrLibrarianMiddleware, adminController.dashboard);
adminRouter.get("/adminUserManagement", authenticateMiddleware.isAdminMiddleware, adminController.adminUserManagement);

adminRouter.get("/adminCreate", authenticateMiddleware.isAdminMiddleware, adminController.adminCreate);
adminRouter.post("/adminStore", authenticateMiddleware.isAdminMiddleware, adminController.adminStore);

adminRouter.get("/adminEdit/:id", authenticateMiddleware.isAdminMiddleware, adminController.adminEdit);
adminRouter.post("/adminUpdate/:id", authenticateMiddleware.isAdminMiddleware, adminController.adminUpdate);

adminRouter.get("/adminDelete/:id", authenticateMiddleware.isAdminMiddleware, adminController.adminDelete);

module.exports = adminRouter;