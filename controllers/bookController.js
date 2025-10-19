const bookModel = require("../models/books");
const path = require("path");
const fs = require('fs');

// Folder to save images: "public/img/"
const IMAGE_FOLDER = path.join(__dirname, "../public/img/books/book_covers");

async function books(req, res){
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6; // You can adjust the default limit
        
        const result = await bookModel.getBooksWithInfoSimple(page, limit);
        
        // Generate page numbers for pagination links
        const pages = [];
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(result.pagination.totalPages, page + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        const model = {
            books: result.books,
            pagination: {
                ...result.pagination,
                pages: pages,
                showingFrom: ((page - 1) * limit) + 1,
                showingTo: Math.min(((page - 1) * limit) + result.books.length, result.pagination.totalBooks)
            }
        };
        
        res.render("books/books.handlebars", model);
    } catch (error) {
        console.error('Error fetching books:', error);
        const model = { 
            error: "Error retrieving books from database.",
            books: [],
            pagination: {}
        };
        res.render("books/books.handlebars", model);
    }
}
async function bookDetail(req, res) {
    const id = req.params.id;
    const book = await bookModel.getBooksWithInfoSimpleById(id);
    const model = {book};
    res.render("books/bookDetail.handlebars", model);
}
async function  createBooK(req, res) {
    const authors = await bookModel.getAuthors();
    const genres = await bookModel.getGenres();
    const publishers = await bookModel.getPublishers();
    const model = {authors, genres, publishers};
    res.render("books/createBook.handlebars", model);
}
async function storeBook(req, res){
    const bookTitle = req.body.bookTitle;
    const ISBN = req.body.ISBN;
    const genreId = req.body.genreId;
    const totalCopies = req.body.totalCopies;
    const availableCopies = req.body.availableCopies;
    const publisherId = req.body.publisherId;
    const publishYear = req.body.publishYear;
    const edition = req.body.edition;
    const language = req.body.language;
    const pageCount = req.body.pageCount;
    const authorId = req.body.authorId;
    const description = req.body.description;
    const coverImage = req.files?.coverImage;

    if(bookTitle.length<=0 || ISBN.length<=0 || genreId=="Select genre" || publisherId=="Select publisher" || publishYear.length<=0 || edition.length<=0 ||
        pageCount.length<=0 || authorId=="Select author" || description.length<=0
    ){
        const authors = await bookModel.getAuthors();
        const genres = await bookModel.getGenres();
        const publishers = await bookModel.getPublishers();
        const model = {error: "Please fill all input",
            authors,
            genres,
            publishers
        };
        return res.render("books/createBook.handlebars", model);
    }

    try{
        const filePath = `/img/books/book_covers/${coverImage.name}`;
        await coverImage.mv(path.join(IMAGE_FOLDER, coverImage.name));

        const reuslt = await bookModel.createNewBook(bookTitle, ISBN, genreId, totalCopies, availableCopies, publisherId, 
                                                    publishYear, edition, language, pageCount, authorId, description, filePath);
        res.redirect("/books");
    }catch(error){
        console.log("Error storingbook: ", error);
        const authors = await bookModel.getAuthors();
        const genres = await bookModel.getGenres();
        const publishers = await bookModel.getPublishers();
        const model = { 
            error: "Error creating book. Please try again.", 
            authors, 
            genres,
            publishers
        };
        res.render("books/createBook.handlebars", model);
    }
}

async function editBook(req, res){
    const id = req.params.id;
    const book = await bookModel.getBooksWithInfoSimpleById(id);
    const authors = await bookModel.getAuthors();
    const genres = await bookModel.getGenres();
    const publishers = await bookModel.getPublishers();
    const model = {book, authors, genres, publishers};
    res.render("books/editBook.handlebars", model);
}

async function updateBook(req, res) {
    const bookId = req.params.id;
    const bookTitle = req.body.bookTitle;
    const ISBN = req.body.ISBN;
    const genreId = req.body.genreId;
    const totalCopies = req.body.totalCopies;
    const availableCopies = req.body.availableCopies;
    const publisherId = req.body.publisherId;
    const publishYear = req.body.publishYear;
    const edition = req.body.edition;
    const language = req.body.language;
    const pageCount = req.body.pageCount;
    const authorId = req.body.authorId;
    const description = req.body.description;
    const currentImagePath = req.body.currentImagePath;
    const coverImage = req.files?.coverImage;

    if(bookTitle.length<=0 || ISBN.length<=0 || genreId=="Select genre" || publisherId=="Select publisher" 
        || publishYear.length<=0 || edition.length<=0 ||pageCount.length<=0 || authorId=="Select author" || description.length<=0
    ){
        const authors = await bookModel.getAuthors();
        const genres = await bookModel.getGenres();
        const publishers = await bookModel.getPublishers();
        const book = await bookModel.getBooksWithInfoSimpleById(bookId);
        const model = {error: "Please fill all input",
            authors,
            genres,
            publishers,
            book
        };
        return res.render("books/editBook.handlebars", model);
    }

    try{
        let filePath = currentImagePath;
        if (coverImage) {
            // Remove old image if it exists and is not the default image
            if (currentImagePath && currentImagePath !== '/img/books/book_covers/default.jpg') {
                const oldImagePath = path.join(__dirname, 'public', currentImagePath);
                
                // Check if file exists and delete it
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log(`Old image deleted: ${oldImagePath}`);
                }
            }
            
            // Save new image
            filePath = `/img/books/book_covers/${coverImage.name}`;
            await coverImage.mv(path.join(IMAGE_FOLDER, coverImage.name));
        }

        const reuslt = await bookModel.editNewBook(bookId, bookTitle, ISBN, genreId, totalCopies, availableCopies, publisherId, 
                                                    publishYear, edition, language, pageCount, authorId, description, filePath);
        res.redirect(`/bookDetail/${bookId}`);
    }catch(error){
        console.log("Error updating book: ", error);
        
        const authors = await bookModel.getAuthors();
        const genres = await bookModel.getGenres();
        const publishers = await bookModel.getPublishers();
        const book = await bookModel.getBooksWithInfoSimpleById(bookId);
        
        const model = {
            error: "Error updating book. Please try again.",
            book,
            authors,
            genres,
            publishers
        };
        res.render("books/editBook.handlebars", model);
    }
}
async function deleteBook(req, res) {
    const id = req.params.id;
    const result = await bookModel.deleteBook(id);
    res.redirect("/books");
}


// genre
function createGenre(req, res){
    res.render("books/createGenre.handlebars");
}

async function editGenre(req, res){
    const id = req.params.id;
    const genre = await bookModel.getGenreById(id);
    const model = {genre}
    res.render("books/editGenre.handlebars", model)
}

// author
function createAuthor(req, res){
    res.render("books/createAuthor.handlebars");
}
async function editAuthor(req, res) {
    const id = req.params.id;
    const author = await bookModel.getAuthorById(id);
    const model = {author}
    res.render("books/editAuthor.handlebars", model);
}

// publisher
function createPublisher(req, res){
    res.render("books/createPublisher.handlebars");
}
async function editPublisher(req, res) {
    const id = req.params.id;
    const publisher = await bookModel.getPublisherById(id);
    const model = {publisher}
    res.render("books/editPublisher.handlebars", model);
}

module.exports = {books, bookDetail, createBooK, storeBook, editBook, updateBook, deleteBook, editGenre, editAuthor, editPublisher,
                    createGenre, createAuthor, createPublisher};