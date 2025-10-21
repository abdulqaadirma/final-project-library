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
async function genre(req, res){
    const genres = await bookModel.getGenres();
    const model = {genres};
    res.render("books/genres.handlebars", model);
}
function createGenre(req, res){
    res.render("books/createGenre.handlebars");
}
async function storeGenre(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    
    if(name.length<=0 || description.length<=0 ){
        const model = {error: "Please fill all input"};
        return res.render("books/createGenre.handlebars", model);
    }
    const result = await bookModel.addGenre(name, description);
    res.redirect("/genres");
}
async function editGenre(req, res){
    const id = req.params.id;
    const genre = await bookModel.getGenreById(id);
    const model = {genre}
    res.render("books/editGenre.handlebars", model)
}
async function updateGenre(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    
    if(name.length<=0 || description.length<=0 ){
        const model = {error: "Please fill all input"};
        return res.render("books/createGenre.handlebars", model);
    }
    const result = await bookModel.updateGenre(id, name, description);
    res.redirect("/genres");
}
async function deleteGenre(req, res) {
    const id = req.params.id;
    const result = bookModel.deleteGenre(id);
    res.redirect("/genres");
}

// author
async function author(req, res){
    const authors = await bookModel.getAuthors();
    const model = {authors};
    res.render("books/authors.handlebars", model);
}
function createAuthor(req, res){
    res.render("books/createAuthor.handlebars");
}
async function storeAuthor(req, res) {
    const name = req.body.name;
    const bio = req.body.bio;
    const nationality = req.body.nationality;
    const birthDate = req.body.birthDate;
    
    if(name.length<=0 || bio.length<=0 || nationality.length<=0 || birthDate.length<=0){
        const model = {error: "Please fill all input"};
        return res.render("books/createAuthor.handlebars", model);
    }
    const result = await bookModel.addAuthor(name, bio, nationality, birthDate);
    res.redirect("/authors");
}
async function editAuthor(req, res) {
    const id = req.params.id;
    const author = await bookModel.getAuthorById(id);
    const model = {author}
    res.render("books/editAuthor.handlebars", model);
}
async function updateAuthor(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const bio = req.body.bio;
    const nationality = req.body.nationality;
    const birthDate = req.body.birthDate;
    
    if(name.length<=0 || bio.length<=0 || nationality.length<=0 || birthDate.length<=0){
        const model = {error: "Please fill all input"};
        return res.render("books/editAuthor.handlebars", model);
    }
    const result = await bookModel.updateAuthor(id, name, bio, nationality, birthDate);
    res.redirect("/authors");
}
async function deleteAuthor(req, res) {
    const id = req.params.id;
    const result = bookModel.deleteAuthor(id);
    res.redirect("/authors");
}

// publisher
async function publisher(req, res){
    const publishers = await bookModel.getPublishers();
    const model = {publishers};
    res.render("books/publishers.handlebars", model);
}
function createPublisher(req, res){
    res.render("books/createPublisher.handlebars");
}
async function storePublisher(req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const contactEmail = req.body.contactEmail;
    const establishedYear = req.body.establishedYear;
    
    if(name.length<=0 || address.length<=0 || contactEmail.length<=0 || establishedYear.length<=0){
        const model = {error: "Please fill all input"};
        return res.render("books/createPublisher.handlebars", model);
    }
    const result = await bookModel.addPublisher(name, address, contactEmail, establishedYear);
    res.redirect("/publishers");
}
async function editPublisher(req, res) {
    const id = req.params.id;
    const publisher = await bookModel.getPublisherById(id);
    const model = {publisher}
    res.render("books/editPublisher.handlebars", model);
}
async function updatePublisher(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const contactEmail = req.body.contactEmail;
    const website = req.body.website;
    const establishedYear = req.body.establishedYear;
    
    if(name.length<=0 || address.length<=0 || contactEmail.length<=0 || establishedYear.length<=0){
        const model = {error: "Please fill all input"};
        return res.render("books/editPublisher.handlebars", model);
    }
    const result = await bookModel.updatePublisher(id, name, address, contactEmail, website, establishedYear);
    res.redirect("/publishers");
}
async function deletePublisher(req, res) {
    const id = req.params.id;
    const result = bookModel.deletePublisher(id);
    res.redirect("/publishers");
}

module.exports = {books, bookDetail, createBooK, storeBook, editBook, updateBook, deleteBook, 
                    genre, createGenre, storeGenre, editGenre, updateGenre, deleteGenre,
                    author, createAuthor, storeAuthor, editAuthor, updateAuthor, deleteAuthor,
                    publisher, createPublisher, storePublisher, editPublisher, updatePublisher, deletePublisher};