const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authenticateMiddleware = require("../controllers/authenticateMiddleware");
const sqlite3 = require("sqlite3");
const dbFile = "../library.sqlite3";

db = new sqlite3.Database(dbFile);

userRouter.get("/", userController.login);
userRouter.get("/login", userController.login);
userRouter.post("/login", userController.loginAuthoicate);
userRouter.get("/create", userController.create);
userRouter.post("/store", userController.store);
userRouter.get("/logout", userController.logout);


module.exports = userRouter;