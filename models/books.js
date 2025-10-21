const db = require("./db");

// book functions
function getBooksWithInfoSimple(page=1, limit=6){
    return new Promise((resolve, reject)=>{

        const offset = (page-1)*limit;
        const countQuery = "SELECT COUNT(*) AS total FROM books";

        db.get(countQuery, (countError, countResult)=>{
            if(countError){
                reject(countError);
                return;
            }

            const totalBooks = countResult.total;
            const totalPages = Math.ceil(totalBooks / limit);

            const query = `SELECT  b.id AS book_id, b.title,  b.isbn,  b.description AS book_description, b.publication_year, 
            b.edition, b.book_cover_image,  b.language, b.total_copies,  b.available_copies, a.id AS author_id, a.name AS author_name, 
            a.bio, a.nationality,  a.birth_date,  a.death_date,  a.author_image, g.name AS genre_name,  g.description AS genre_description
            FROM books b
            INNER JOIN book_authors ba ON b.id = ba.book_id
            INNER JOIN authors a ON ba.author_id = a.id
            INNER JOIN genres g ON b.genre_id = g.id
            ORDER BY b.title
            LIMIT ? OFFSET ?;`

            db.all(query, [limit, offset], (error, books)=>{
                if(error){
                    console.log(error);
                    reject(error);
                }else{
                    resolve({
                        books: books,
                        pagination: {
                            currentPage: page,
                            totalPages: totalPages,
                            totalBooks: totalBooks,
                            hasPrevPage: page > 1,
                            hasNextPage: page < totalPages,
                            prevPage: page - 1,
                            nextPage: page + 1,
                            limit: limit
                        }
                    });
                }
            });
        }); 
    });
}
function getBooksWithInfoSimpleById(id){
    return new Promise((resolve, reject)=>{
        const query = `SELECT  b.id AS book_id, b.title,  b.isbn,  b.description AS book_description, b.publication_year, 
            b.edition, b.book_cover_image,  b.language, b.total_copies,  b.available_copies, b.page_count, a.id AS author_id, a.name AS author_name, 
            a.bio, a.nationality,  a.birth_date,  a.death_date,  a.author_image, g.name AS genre_name,  g.description AS genre_description,
            p.id AS publisher_id, p.name AS publisher_name
            FROM books b
            INNER JOIN book_authors ba ON b.id = ba.book_id
            INNER JOIN authors a ON ba.author_id = a.id
            INNER JOIN genres g ON b.genre_id = g.id
            INNER JOIN publishers p ON b.publisher_id = p.id
            WHERE b.id = ?;`

        db.get(query, [id], (error, book)=>{
            if(error){
                reject(error);
            }else{
                resolve(book);
            }
        })
    });
}

function getBooks(){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM books;";
        db.all(query, (error, books)=>{
            if(error){
                console.log(error);
                reject(error);
            }else{
                resolve(books)
            }
        });
    });
}
function getBookById(id){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM books WHERE id = ?";
        db.get(query, [id], (error, user)=>{
            if(error){
                reject(error);
            }else{
                resolve(user);
            }
        })
    });
}
function storeBook(title, isbn, description, genre_id, publisher_id, publication_year, edition,
                            total_copies, available_copies, book_cover_image, language, page_count){
    return new Promise((resolve, reject)=>{
        const query = "INSERT INTO books ( title, isbn, description, genre_id, publisher_id, publication_year, edition,\
                            total_copies, available_copies, book_cover_image, language, page_count)\
                            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.run(query, [title, isbn, description, genre_id, publisher_id, publication_year, edition,
                            total_copies, available_copies, book_cover_image, language, page_count
                        ], async function(error){
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                const bookId = this.lastID;
                const book = await getBookById(bookId);
                resolve(book);
            }
        });
    });
}
function updateBook(bookId, title, isbn, description, genre_id, publisher_id, publication_year, edition,
                            total_copies, available_copies, book_cover_image, language, page_count){
    return new Promise((resolve, reject)=>{
        const query = "UPDATE books SET title = ?, isbn = ?, description = ?, genre_id = ?, publisher_id = ?, publication_year = ?,\
                        edition = ?, total_copies = ?, available_copies = ?, book_cover_image = ?, language = ?, page_count = ?,\
                        updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        db.run(query, [title, isbn, description, genre_id, publisher_id, publication_year, edition,
                            total_copies, available_copies, book_cover_image, language, page_count, bookId
                        ], async function(error){
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                const book = await getBookById(bookId);
                resolve(book);
            }
        });
    });
}
async function deleteBook(id){
    
    const book = await getBooksWithInfoSimpleById(id);
    const bookId = book.book_id;
    const authorId = book.author_id;
    const resultDeleteBook = await deleteBook_author(bookId, authorId);
    //console.log(resultDeleteBook);

    return new Promise((resolve, reject)=>{
        const query = "DELETE FROM books WHERE id = ?";
        db.run(query, [id], (error)=>{
          if(error){
            reject(error);
          }else{
            resolve("seccess deleted");
          }
        });
    });
}

    
// author function
function getAuthors(){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM authors";
        db.all(query, (error, authors)=>{
            if(error){
                reject(error);
            }else{
                resolve(authors);
            }
        });
    });
}
function getAuthorById(id){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM authors WHERE id = ?";
        db.get(query,[id], (error, author)=>{
            if(error){
                reject(error);
            }else{
                resolve(author);
            }
        })
    })
}
function addAuthor(name, bio, nationality, birth_date, death_date=null){
    return new Promise((resolve, reject)=>{
        const query = "INSERT INTO authors(name, bio, nationality, birth_date, death_date) \
                        values(?, ?, ?, ?, ?);"
        db.run(query, [name, bio, nationality, birth_date, death_date], (error)=>{
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                resolve("success added");
            }
        });
    });
}
function updateAuthor(id, name, bio, nationality, birth_date, death_date=null){
    return new Promise((resolve, reject)=>{
        const query = "UPDATE authors SET name = ?, bio = ?, nationality = ?, birth_date = ?, death_date = ? WHERE id = ?";
        db.run(query, [name, bio, nationality, birth_date, death_date, id], (error)=>{
            if(error){
                reject(error);
            }else {
                resolve("success updated");
            }
        });
    });
}
function deleteAuthor(id){
    return new Promise((resolve, reject)=>{
        const query = "DELETE FROM authors WHERE id = ?";
        db.run(query, [id], (error)=>{
            if(error){
                reject(error);
            }else{
                resolve("success deleted");
            }
        });
    });
}

// book_author functions
function addBook_author(book_id, author_id) {
    return new Promise((resolve, reject)=>{
        const query = "INSERT INTO book_authors(book_id, author_id) values(?, ?)";
        db.run(query, [book_id, author_id], (error)=>{
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                resolve("success addBook_author");
            }
        });
    });
}
function updateBook_author(book_id, author_id) {
    return new Promise((resolve, reject)=>{
        const query = "UPDATE book_authors SET author_id = ? WHERE book_id = ?";
        db.run(query, [author_id, book_id], (error)=>{
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                resolve("success updateBook_author");
            }
        });
    });
}
function deleteBook_author(book_id, author_id) {
    return new Promise((resolve, reject)=>{
        const query = "DELETE FROM book_authors WHERE book_id = ? AND author_id = ?";
        db.run(query, [book_id, author_id], (error)=>{
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                resolve("success deleteBook_author");
            }
        });
    });
}

// genre function
function getGenres(){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM genres";
        db.all(query, (error, authors)=>{
            if(error){
                reject(error);
            }else{
                resolve(authors);
            }
        })
    })
}
function getGenreById(id){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM genres WHERE id = ?";
        db.get(query,[id], (error, genre)=>{
            if(error){
                reject(error);
            }else{
                resolve(genre);
            }
        })
    })
}
function addGenre(name, description){
    return new Promise((resolve, reject)=>{
        const query = "INSERT INTO genres(name, description) values(?, ?)"
        db.run(query, [name, description], (error)=>{
            if(error){
                //console.log("ERROR: ", error);
                reject(error);
            } else {
                console.log("Line add into Genre table");
                resolve("success added");
            }
        });
    });
}
function updateGenre(id, name, description){
    return new Promise((resolve, reject)=>{
        const query = "UPDATE genres SET name = ?, description = ? WHERE id = ?"
        db.run(query, [name, description, id], (error)=>{
            if(error){
                reject(error);
            }else {
                resolve("success updated");
            }
        });
    });
}
function deleteGenre(id){
    return new Promise((resolve, reject)=>{
        const query = "DELETE FROM genres WHERE id = ?";
        db.run(query, [id], (error)=>{
            if(error){
                reject(error);
            }else{
                resolve("success deleted");
            }
        });
    });
}

// publisher function
function getPublishers(){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM publishers";
        db.all(query, (error, publishers)=>{
            if(error){
                reject(error);
            }else{
                resolve(publishers);
            }
        })
    })
}
function getPublisherById(id){
    return new Promise((resolve, reject)=>{
        const query = "SELECT * FROM publishers WHERE id = ?";
        db.get(query,[id], (error, publisher)=>{
            if(error){
                reject(error);
            }else{
                resolve(publisher);
            }
        })
    })
}
function addPublisher(name, address, contact_email, website, established_year){
    return new Promise((resolve, reject)=>{
        const query = "INSERT INTO publishers(name, address, contact_email, website, established_year)\
                            values(?, ?, ?, ?, ?)"
        db.run(query, [name, address, contact_email, website, established_year], (error)=>{
            if(error){
                console.log("ERROR: ", error);
                reject(error);
            } else {
                //console.log("Line add into publisher table");
                resolve("success added");
            }
        });
    });
}
function updatePublisher(id, name, address, contact_email, website, established_year){
    return new Promise((resolve, reject)=>{
        const query = "UPDATE publishers SET name = ?, address = ?, contact_email = ?, website = ?, established_year = ? WHERE id = ?";
        db.run(query, [name, address, contact_email, website, established_year, id], (error)=>{
            if(error){
                reject(error);
            }else {
                resolve("success updated");
            }
        });
    });
}
function deletePublisher(id){
    return new Promise((resolve, reject)=>{
        const query = "DELETE FROM publishers WHERE id = ?";
        db.run(query, [id], (error)=>{
            if(error){
                reject(error);
            }else{
                resolve("success deleted");
            }
        });
    });
}
// totla each talbe
function totalUsers(){
    return new Promise((resolve, reject)=>{
        db.get("SELECT COUNT(*) AS count FROM users", (error, total)=>{
            if(error){
                reject(error)
            }else{
                resolve(total.count);
            }
        })
    })
}
function totalBooks(){
    return new Promise((resolve, reject)=>{
        db.get("SELECT COUNT(*) AS count FROM books", (error, total)=>{
            if(error){
                reject(error)
            }else{
                resolve(total.count);
            }
        })
    })
}
function totalAuthors(){
    return new Promise((resolve, reject)=>{
        db.get("SELECT COUNT(*) AS count FROM authors", (error, total)=>{
            if(error){
                reject(error)
            }else{
                resolve(total.count);
            }
        })
    })
}
function totalGenres(){
    return new Promise((resolve, reject)=>{
        db.get("SELECT COUNT(*) AS count FROM genres", (error, total)=>{
            if(error){
                reject(error)
            }else{
                resolve(total.count);
            }
        })
    })
}
function totalPublishers(){
    return new Promise((resolve, reject)=>{
        db.get("SELECT COUNT(*) AS count FROM publishers", (error, total)=>{
            if(error){
                reject(error)
            }else{
                resolve(total.count);
            }
        })
    })
}



async function createNewBook(bookTitle, ISBN, genreId, totalCopies, availableCopies, publisherId, 
                                publishYear, edition, language, pageCount, authorId, description, filePath){
    
    const storeBookResult = await storeBook(bookTitle, ISBN, description, genreId, publisherId, publishYear, edition, totalCopies, 
                                                availableCopies, filePath, language, pageCount
                                            );
    const addBook_authorResult = await addBook_author(storeBookResult.id, authorId);
}

async function editNewBook(bookId, bookTitle, ISBN, genreId, totalCopies, availableCopies, publisherId, 
                                publishYear, edition, language, pageCount, authorId, description, filePath) {

    const updateBookResult = await updateBook(bookId, bookTitle, ISBN, description, genreId, publisherId, publishYear, edition, totalCopies, 
                                                availableCopies, filePath, language, pageCount
                                            );
    const addBook_authorResult = await updateBook_author(updateBookResult.id, authorId);
}


module.exports = {getBooks, getBookById, deleteBook, 
                  getAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor,
                  getGenres, getGenreById, addGenre, updateGenre, deleteGenre,
                  getPublishers, getPublisherById, addPublisher, updatePublisher, deletePublisher, 
                  createNewBook, editNewBook, getBooksWithInfoSimple, getBooksWithInfoSimpleById,
                  totalUsers, totalBooks, totalAuthors, totalGenres, totalPublishers};