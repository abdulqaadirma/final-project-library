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
bookRouter.get("/genres", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.genre);
bookRouter.get("/createGenre", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createGenre);
bookRouter.post("/storeGenre", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storeGenre);
bookRouter.get("/editGenre/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editGenre);
bookRouter.post("/updateGenre/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updateGenre);
bookRouter.get("/deleteGenre/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.deleteGenre);

// author
bookRouter.get("/authors", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.author);
bookRouter.get("/createAuthor", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createAuthor);
bookRouter.post("/storeAuthor", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storeAuthor);
bookRouter.get("/editAuthor/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editAuthor);
bookRouter.post("/updateAuthor/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updateAuthor);
bookRouter.get("/deleteAuthor/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.deleteAuthor);

// publisher
bookRouter.get("/publishers", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.publisher);
bookRouter.get("/createPublisher", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.createPublisher);
bookRouter.post("/storePublisher", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.storePublisher);
bookRouter.get("/editPublisher/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.editPublisher);
bookRouter.post("/updatePublisher/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.updatePublisher);
bookRouter.get("/deletePublisher/:id", authenticateMiddleware.isAdminOrLibrarianMiddleware, booksController.deletePublisher);

module.exports = bookRouter;