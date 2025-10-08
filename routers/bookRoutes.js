const express = require("express");
const bookRouter = express.Router();
const booksController = require("../controllers/bookController");

bookRouter.get("/books", booksController.books);

module.exports = bookRouter;