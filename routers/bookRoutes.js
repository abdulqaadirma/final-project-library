const express = require("express");
const bookRouter = express.Router();
const booksController = require("../controllers/bookController");
const authenticateMiddleware = require("../controllers/authenticateMiddleware");

// book
bookRouter.get("/books", authenticateMiddleware.isAdminOrLibrarianOrMemberMiddleware, booksController.books);
bookRouter.get("/bookDetail/:id", authenticateMiddleware.isAdminOrLibrarianOrMemberMiddleware, booksController.bookDetail);
bookRouter.get("/createBook", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createBooK);
bookRouter.post("/storeBook", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storeBook);
bookRouter.get("/editBook/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editBook);
bookRouter.post("/updateBook/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updateBook);
bookRouter.get("/deleteBook/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.deleteBook);

// genre
bookRouter.get("/createGenre", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createGenre);
//bookRouter.get("/storeGenre", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storeGenre);
bookRouter.get("/editGenre", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editGenre);
//bookRouter.post("/updateGenre", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updateGenre);

// author
bookRouter.get("/createAuthor", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createAuthor);
//bookRouter.get("/storeAuthor", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storeAuthor);
bookRouter.get("/editAuthor", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editAuthor);
//bookRouter.post("/updateAuthor", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updateAuthor);

// publisher
bookRouter.get("/createPublisher", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createPublisher);
//bookRouter.get("/storePublisher", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storePublisher);
bookRouter.get("/editPublisher", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editPublisher);
//bookRouter.post("/updatePublisher", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updatePublisher);

module.exports = bookRouter;