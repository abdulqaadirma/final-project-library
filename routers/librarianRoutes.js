const express = require("express");
const librarianRouter = express.Router();
const librarianController = require("../controllers/librarianController");
const authenticateMiddleware = require("../controllers/authenticateMiddleware");

librarianRouter.get("/librarianDashboard", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianDashboard);
librarianRouter.get("/librarianUserManagement", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianUserManagement);

librarianRouter.get("/librarianCreate", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianCreate);
librarianRouter.post("/librarianStore", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianStore);

librarianRouter.get("/librarianEdit/:id", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianEdit);
librarianRouter.post("/librarianUpdate/:id", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianUpdate);

librarianRouter.get("/librarianDelete/:id", authenticateMiddleware.isLibrarianMiddleware, librarianController.librarianDelete);

module.exports = librarianRouter;