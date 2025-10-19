const db = require("./db");

const authors = [
    {
      "name": "George Orwell",
      "bio": "English novelist and essayist, journalist and critic",
      "nationality": "British",
      "birth_date": "1903-06-25",
      "death_date": "1950-01-21",
      "author_image": "https://example.com/images/george_orwell.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "J.K. Rowling",
      "bio": "British author and philanthropist, best known for Harry Potter",
      "nationality": "British",
      "birth_date": "1965-07-31",
      "death_date": null,
      "author_image": "https://example.com/images/jk_rowling.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Stephen King",
      "bio": "American author of horror, supernatural fiction, suspense, and fantasy novels",
      "nationality": "American",
      "birth_date": "1947-09-21",
      "death_date": null,
      "author_image": "https://example.com/images/stephen_king.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Agatha Christie",
      "bio": "English writer known for her detective novels",
      "nationality": "British",
      "birth_date": "1890-09-15",
      "death_date": "1976-01-12",
      "author_image": "https://example.com/images/agatha_christie.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Isaac Asimov",
      "bio": "American writer and professor of biochemistry, known for science fiction",
      "nationality": "American",
      "birth_date": "1920-01-02",
      "death_date": "1992-04-06",
      "author_image": "https://example.com/images/isaac_asimov.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Jane Austen",
      "bio": "English novelist known primarily for her six major novels",
      "nationality": "British",
      "birth_date": "1775-12-16",
      "death_date": "1817-07-18",
      "author_image": "https://example.com/images/jane_austen.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Ernest Hemingway",
      "bio": "American novelist, short-story writer, and journalist",
      "nationality": "American",
      "birth_date": "1899-07-21",
      "death_date": "1961-07-02",
      "author_image": "https://example.com/images/ernest_hemingway.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Mark Twain",
      "bio": "American writer, humorist, entrepreneur, publisher, and lecturer",
      "nationality": "American",
      "birth_date": "1835-11-30",
      "death_date": "1910-04-21",
      "author_image": "https://example.com/images/mark_twain.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "J.R.R. Tolkien",
      "bio": "English writer, poet, philologist, and academic",
      "nationality": "British",
      "birth_date": "1892-01-03",
      "death_date": "1973-09-02",
      "author_image": "https://example.com/images/jrr_tolkien.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Charles Dickens",
      "bio": "English writer and social critic",
      "nationality": "British",
      "birth_date": "1812-02-07",
      "death_date": "1870-06-09",
      "author_image": "https://example.com/images/charles_dickens.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Leo Tolstoy",
      "bio": "Russian writer who is regarded as one of the greatest authors of all time",
      "nationality": "Russian",
      "birth_date": "1828-09-09",
      "death_date": "1910-11-20",
      "author_image": "https://example.com/images/leo_tolstoy.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Virginia Woolf",
      "bio": "English writer, considered one of the most important modernist authors",
      "nationality": "British",
      "birth_date": "1882-01-25",
      "death_date": "1941-03-28",
      "author_image": "https://example.com/images/virginia_woolf.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "F. Scott Fitzgerald",
      "bio": "American novelist and short story writer",
      "nationality": "American",
      "birth_date": "1896-09-24",
      "death_date": "1940-12-21",
      "author_image": "https://example.com/images/f_scott_fitzgerald.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Harper Lee",
      "bio": "American novelist famous for To Kill a Mockingbird",
      "nationality": "American",
      "birth_date": "1926-04-28",
      "death_date": "2016-02-19",
      "author_image": "https://example.com/images/harper_lee.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Gabriel Garcia Marquez",
      "bio": "Colombian novelist, short-story writer, screenwriter and journalist",
      "nationality": "Colombian",
      "birth_date": "1927-03-06",
      "death_date": "2014-04-17",
      "author_image": "https://example.com/images/gabriel_garcia_marquez.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Frank Herbert",
      "bio": "American science fiction author best known for the novel Dune",
      "nationality": "American",
      "birth_date": "1920-10-08",
      "death_date": "1986-02-11",
      "author_image": "https://example.com/images/frank_herbert.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Aldous Huxley",
      "bio": "English writer and philosopher, author of Brave New World",
      "nationality": "British",
      "birth_date": "1894-07-26",
      "death_date": "1963-11-22",
      "author_image": "https://example.com/images/aldous_huxley.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "J.D. Salinger",
      "bio": "American author best known for The Catcher in the Rye",
      "nationality": "American",
      "birth_date": "1919-01-01",
      "death_date": "2010-01-27",
      "author_image": "https://example.com/images/jd_salinger.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Dan Brown",
      "bio": "American author best known for The Da Vinci Code",
      "nationality": "American",
      "birth_date": "1964-06-22",
      "death_date": null,
      "author_image": "https://example.com/images/dan_brown.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Paulo Coelho",
      "bio": "Brazilian lyricist and novelist, author of The Alchemist",
      "nationality": "Brazilian",
      "birth_date": "1947-08-24",
      "death_date": null,
      "author_image": "https://example.com/images/paulo_coelho.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Khaled Hosseini",
      "bio": "Afghan-American novelist and physician, author of The Kite Runner",
      "nationality": "Afghan-American",
      "birth_date": "1965-03-04",
      "death_date": null,
      "author_image": "https://example.com/images/khaled_hosseini.jpg",
      "created_at": "2025-10-09T00:00:00Z"
    }
];
const books = [
  {
    "title": "1984",
    "isbn": "9780451524935",
    "description": "A dystopian social science fiction novel and cautionary tale",
    "genre_id": 2,
    "publisher_id": 1,
    "publication_year": 1949,
    "edition": "1st",
    "total_copies": 5,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/1984.jpg",
    "language": "English",
    "page_count": 328,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "Harry Potter and the Philosophers Stone",
    "isbn": "9780747532743",
    "description": "The first novel in the Harry Potter series",
    "genre_id": 1,
    "publisher_id": 2,
    "publication_year": 1997,
    "edition": "1st",
    "total_copies": 8,
    "available_copies": 5,
    "book_cover_image": "/img/books/book_covers/Harry Potter and the Philosophers Stone.jpg",
    "language": "English",
    "page_count": 223,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Shining",
    "isbn": "9780307743657",
    "description": "A horror novel by Stephen King",
    "genre_id": 1,
    "publisher_id": 3,
    "publication_year": 1977,
    "edition": "1st",
    "total_copies": 4,
    "available_copies": 2,
    "book_cover_image": "/img/books/book_covers/The Shining.jpg",
    "language": "English",
    "page_count": 447,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "Murder on the Orient Express",
    "isbn": "9780062693662",
    "description": "A detective novel by Agatha Christie",
    "genre_id": 3,
    "publisher_id": 4,
    "publication_year": 1934,
    "edition": "1st",
    "total_copies": 6,
    "available_copies": 4,
    "book_cover_image": "/img/books/book_covers/Murder on the Orient Express.jpg",
    "language": "English",
    "page_count": 256,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "Foundation",
    "isbn": "9780553293357",
    "description": "The first novel in Isaac Asimov's Foundation series",
    "genre_id": 2,
    "publisher_id": 1,
    "publication_year": 1951,
    "edition": "1st",
    "total_copies": 3,
    "available_copies": 1,
    "book_cover_image": "/img/books/book_covers/Foundation.jpg",
    "language": "English",
    "page_count": 255,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "Pride and Prejudice",
    "isbn": "9780141439518",
    "description": "A romantic novel of manners",
    "genre_id": 4,
    "publisher_id": 5,
    "publication_year": 1813,
    "edition": "1st",
    "total_copies": 7,
    "available_copies": 6,
    "book_cover_image": "/img/books/book_covers/Pride and Prejudice.jpg",
    "language": "English",
    "page_count": 432,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Old Man and the Sea",
    "isbn": "9780684801223",
    "description": "A short novel by Ernest Hemingway",
    "genre_id": 1,
    "publisher_id": 3,
    "publication_year": 1952,
    "edition": "1st",
    "total_copies": 5,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/The Old Man and the Sea.jpg",
    "language": "English",
    "page_count": 127,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Adventures of Huckleberry Finn",
    "isbn": "9780142437179",
    "description": "A novel by Mark Twain",
    "genre_id": 1,
    "publisher_id": 5,
    "publication_year": 1884,
    "edition": "1st",
    "total_copies": 4,
    "available_copies": 2,
    "book_cover_image": "/img/books/book_covers/The Adventures of Huckleberry Finn.jpg",
    "language": "English",
    "page_count": 366,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Lord of the Rings",
    "isbn": "9780544003415",
    "description": "An epic high fantasy novel",
    "genre_id": 1,
    "publisher_id": 2,
    "publication_year": 1954,
    "edition": "1st",
    "total_copies": 6,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/The Lord of the Rings.jpg",
    "language": "English",
    "page_count": 1178,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "A Tale of Two Cities",
    "isbn": "9780141439600",
    "description": "A historical novel by Charles Dickens",
    "genre_id": 1,
    "publisher_id": 5,
    "publication_year": 1859,
    "edition": "1st",
    "total_copies": 5,
    "available_copies": 4,
    "book_cover_image": "/img/books/book_covers/A Tale of Two Cities.jpg",
    "language": "English",
    "page_count": 489,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "War and Peace",
    "isbn": "9780140447934",
    "description": "A literary work mixed with historical fiction",
    "genre_id": 1,
    "publisher_id": 5,
    "publication_year": 1869,
    "edition": "1st",
    "total_copies": 3,
    "available_copies": 1,
    "book_cover_image": "/img/books/book_covers/War and Peace.jpg",
    "language": "English",
    "page_count": 1225,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "To the Lighthouse",
    "isbn": "9780156907392",
    "description": "A novel by Virginia Woolf",
    "genre_id": 1,
    "publisher_id": 6,
    "publication_year": 1927,
    "edition": "1st",
    "total_copies": 4,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/To the Lighthouse.jpg",
    "language": "English",
    "page_count": 209,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Great Gatsby",
    "isbn": "9780743273565",
    "description": "A novel by American author F. Scott Fitzgerald",
    "genre_id": 1,
    "publisher_id": 3,
    "publication_year": 1925,
    "edition": "1st",
    "total_copies": 6,
    "available_copies": 4,
    "book_cover_image": "/img/books/book_covers/The Great Gatsby.jpg",
    "language": "English",
    "page_count": 180,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "To Kill a Mockingbird",
    "isbn": "9780061120084",
    "description": "A novel by Harper Lee",
    "genre_id": 1,
    "publisher_id": 2,
    "publication_year": 1960,
    "edition": "1st",
    "total_copies": 5,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/To Kill a Mockingbird.jpg",
    "language": "English",
    "page_count": 281,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "One Hundred Years of Solitude",
    "isbn": "9780060883287",
    "description": "A landmark 1967 novel by Gabriel Garcia Marquez",
    "genre_id": 1,
    "publisher_id": 2,
    "publication_year": 1967,
    "edition": "1st",
    "total_copies": 4,
    "available_copies": 2,
    "book_cover_image": "/img/books/book_covers/One Hundred Years of Solitude.jpg",
    "language": "English",
    "page_count": 417,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "Dune",
    "isbn": "9780441172719",
    "description": "A 1965 science fiction novel by Frank Herbert",
    "genre_id": 2,
    "publisher_id": 1,
    "publication_year": 1965,
    "edition": "1st",
    "total_copies": 5,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/Dune.jpg",
    "language": "English",
    "page_count": 412,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Hobbit",
    "isbn": "9780547928227",
    "description": "A children's fantasy novel by J. R. R. Tolkien",
    "genre_id": 1,
    "publisher_id": 2,
    "publication_year": 1937,
    "edition": "1st",
    "total_copies": 7,
    "available_copies": 5,
    "book_cover_image": "/img/books/book_covers/The Hobbit.jpg",
    "language": "English",
    "page_count": 310,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "Brave New World",
    "isbn": "9780060850524",
    "description": "A dystopian social science fiction novel by Aldous Huxley",
    "genre_id": 2,
    "publisher_id": 2,
    "publication_year": 1932,
    "edition": "1st",
    "total_copies": 4,
    "available_copies": 2,
    "book_cover_image": "/img/books/book_covers/Brave New World.jpg",
    "language": "English",
    "page_count": 288,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Catcher in the Rye",
    "isbn": "9780316769488",
    "description": "A novel by J. D. Salinger",
    "genre_id": 1,
    "publisher_id": 7,
    "publication_year": 1951,
    "edition": "1st",
    "total_copies": 6,
    "available_copies": 4,
    "book_cover_image": "/img/books/book_covers/The Catcher in the Rye.jpg",
    "language": "English",
    "page_count": 234,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Da Vinci Code",
    "isbn": "9780307474278",
    "description": "A 2003 mystery thriller novel by Dan Brown",
    "genre_id": 3,
    "publisher_id": 1,
    "publication_year": 2003,
    "edition": "1st",
    "total_copies": 8,
    "available_copies": 6,
    "book_cover_image": "/img/books/book_covers/The Da Vinci Code.jpg",
    "language": "English",
    "page_count": 489,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Alchemist",
    "isbn": "9780061120085",
    "description": "A novel by Paulo Coelho",
    "genre_id": 1,
    "publisher_id": 2,
    "publication_year": 1988,
    "edition": "1st",
    "total_copies": 5,
    "available_copies": 4,
    "book_cover_image": "/img/books/book_covers/The Alchemist.jpg",
    "language": "English",
    "page_count": 208,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  },
  {
    "title": "The Kite Runner",
    "isbn": "9781594631931",
    "description": "A novel by Khaled Hosseini",
    "genre_id": 1,
    "publisher_id": 1,
    "publication_year": 2003,
    "edition": "1st",
    "total_copies": 4,
    "available_copies": 3,
    "book_cover_image": "/img/books/book_covers/The Kite Runner.jpg",
    "language": "English",
    "page_count": 371,
    "created_at": "2025-10-09T00:00:00Z",
    "updated_at": "2025-10-09T00:00:00Z"
  }
];

const book_authors = [
    { "book_id": 1, "author_id": 1 },  // 1984 - George Orwell
    { "book_id": 2, "author_id": 2 },  // Harry Potter - J.K. Rowling
    { "book_id": 3, "author_id": 3 },  // The Shining - Stephen King
    { "book_id": 4, "author_id": 4 },  // Murder on the Orient Express - Agatha Christie
    { "book_id": 5, "author_id": 5 },  // Foundation - Isaac Asimov
    { "book_id": 6, "author_id": 6 },  // Pride and Prejudice - Jane Austen
    { "book_id": 7, "author_id": 7 },  // The Old Man and the Sea - Ernest Hemingway
    { "book_id": 8, "author_id": 8 },  // Huckleberry Finn - Mark Twain
    { "book_id": 9, "author_id": 9 },  // Lord of the Rings - J.R.R. Tolkien
    { "book_id": 10, "author_id": 10 }, // Tale of Two Cities - Charles Dickens
    { "book_id": 11, "author_id": 11 }, // War and Peace - Leo Tolstoy
    { "book_id": 12, "author_id": 12 }, // To the Lighthouse - Virginia Woolf
    { "book_id": 13, "author_id": 13 }, // The Great Gatsby - F. Scott Fitzgerald
    { "book_id": 14, "author_id": 14 }, // To Kill a Mockingbird - Harper Lee
    { "book_id": 15, "author_id": 15 }, // One Hundred Years of Solitude - Gabriel Garcia Marquez
    { "book_id": 16, "author_id": 16 }, // Dune - Frank Herbert
    { "book_id": 17, "author_id": 9 },  // The Hobbit - J.R.R. Tolkien
    { "book_id": 18, "author_id": 17 }, // Brave New World - Aldous Huxley
    { "book_id": 19, "author_id": 18 }, // The Catcher in the Rye - J.D. Salinger
    { "book_id": 20, "author_id": 19 }, // The Da Vinci Code - Dan Brown
    { "book_id": 21, "author_id": 20 }, // The Alchemist - Paulo Coelho
    { "book_id": 22, "author_id": 21 }  // The Kite Runner - Khaled Hosseini
];

const genres = [
    {
      "name": "Fiction",
      "description": "Imaginative literary works and novels"
    },
    {
      "name": "Science Fiction",
      "description": "Futuristic and scientific themes"
    },
    {
      "name": "Mystery",
      "description": "Crime and detective stories"
    },
    {
      "name": "Romance",
      "description": "Love and relationship stories"
    },
    {
      "name": "Biography",
      "description": "Accounts of peoples lives"
    },
    {
      "name": "History",
      "description": "Historical events and periods"
    },
    {
      "name": "Science",
      "description": "Scientific knowledge and discoveries"
    },
    {
      "name": "Technology",
      "description": "Technical and computer-related topics"
    }
];

const publishers = [
    {
      "name": "Penguin Random House",
      "address": "1745 Broadway, New York, NY 10019, USA",
      "contact_email": "contact@penguinrandomhouse.com",
      "website": "https://www.penguinrandomhouse.com",
      "established_year": 2013,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "HarperCollins",
      "address": "195 Broadway, New York, NY 10007, USA",
      "contact_email": "info@harpercollins.com",
      "website": "https://www.harpercollins.com",
      "established_year": 1817,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Simon & Schuster",
      "address": "1230 Avenue of the Americas, New York, NY 10020, USA",
      "contact_email": "support@simonandschuster.com",
      "website": "https://www.simonandschuster.com",
      "established_year": 1924,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Hachette Livre",
      "address": "58 Rue Jean Bleuzen, 92170 Vanves, France",
      "contact_email": "contact@hachette.com",
      "website": "https://www.hachette.com",
      "established_year": 1826,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Macmillan Publishers",
      "address": "120 Broadway, New York, NY 10271, USA",
      "contact_email": "info@macmillan.com",
      "website": "https://www.macmillan.com",
      "established_year": 1843,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Oxford University Press",
      "address": "Great Clarendon Street, Oxford OX2 6DP, United Kingdom",
      "contact_email": "oup@ox.ac.uk",
      "website": "https://global.oup.com",
      "established_year": 1586,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Cambridge University Press",
      "address": "University Printing House, Shaftesbury Rd, Cambridge CB2 8BS, United Kingdom",
      "contact_email": "information@cambridge.org",
      "website": "https://www.cambridge.org",
      "established_year": 1534,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Wiley",
      "address": "111 River Street, Hoboken, NJ 07030, USA",
      "contact_email": "support@wiley.com",
      "website": "https://www.wiley.com",
      "established_year": 1807,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Springer Nature",
      "address": "Heidelberger Platz 3, 14197 Berlin, Germany",
      "contact_email": "service@springernature.com",
      "website": "https://www.springernature.com",
      "established_year": 2015,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "name": "Pearson Education",
      "address": "80 Strand, London WC2R 0RL, United Kingdom",
      "contact_email": "help@pearson.com",
      "website": "https://www.pearson.com",
      "established_year": 1844,
      "created_at": "2025-10-09T00:00:00Z"
    }
];

const borrow_records = [
    {
      "user_id": 4,
      "book_id": 1,
      "borrow_date": "2024-01-15",
      "due_date": "2024-02-15",
      "return_date": "2024-02-10",
      "status": "returned",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 5,
      "book_id": 2,
      "borrow_date": "2024-02-01",
      "due_date": "2024-03-01",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 6,
      "book_id": 3,
      "borrow_date": "2024-01-20",
      "due_date": "2024-02-20",
      "return_date": "2024-02-18",
      "status": "returned",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 7,
      "book_id": 4,
      "borrow_date": "2024-02-10",
      "due_date": "2024-03-10",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 8,
      "book_id": 5,
      "borrow_date": "2024-01-25",
      "due_date": "2024-02-25",
      "return_date": null,
      "status": "overdue",
      "fine_amount": 15.50,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 4,
      "book_id": 6,
      "borrow_date": "2024-02-05",
      "due_date": "2024-03-05",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 9,
      "book_id": 7,
      "borrow_date": "2024-01-30",
      "due_date": "2024-02-29",
      "return_date": "2024-02-25",
      "status": "returned",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 10,
      "book_id": 8,
      "borrow_date": "2024-02-12",
      "due_date": "2024-03-12",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 11,
      "book_id": 9,
      "borrow_date": "2024-02-14",
      "due_date": "2024-03-14",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 12,
      "book_id": 10,
      "borrow_date": "2024-01-10",
      "due_date": "2024-02-10",
      "return_date": "2024-02-08",
      "status": "returned",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 13,
      "book_id": 11,
      "borrow_date": "2024-02-18",
      "due_date": "2024-03-18",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 14,
      "book_id": 12,
      "borrow_date": "2024-02-20",
      "due_date": "2024-03-20",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 15,
      "book_id": 13,
      "borrow_date": "2024-01-28",
      "due_date": "2024-02-28",
      "return_date": "2024-02-26",
      "status": "returned",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 4,
      "book_id": 14,
      "borrow_date": "2024-02-22",
      "due_date": "2024-03-22",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 5,
      "book_id": 15,
      "borrow_date": "2024-02-16",
      "due_date": "2024-03-16",
      "return_date": null,
      "status": "borrowed",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 6,
      "book_id": 16,
      "borrow_date": "2024-01-18",
      "due_date": "2024-02-18",
      "return_date": "2024-02-15",
      "status": "returned",
      "fine_amount": 0.00,
      "created_at": "2025-10-09T00:00:00Z"
    }
];

const reservations = [
    {
      "user_id": 5,
      "book_id": 1,
      "reservation_date": "2024-02-20",
      "expiry_date": "2024-03-06",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 6,
      "book_id": 9,
      "reservation_date": "2024-02-18",
      "expiry_date": "2024-03-04",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 7,
      "book_id": 15,
      "reservation_date": "2024-02-15",
      "expiry_date": "2024-02-29",
      "status": "fulfilled",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 8,
      "book_id": 3,
      "reservation_date": "2024-02-25",
      "expiry_date": "2024-03-10",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 9,
      "book_id": 7,
      "reservation_date": "2024-02-12",
      "expiry_date": "2024-02-26",
      "status": "cancelled",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 10,
      "book_id": 12,
      "reservation_date": "2024-02-28",
      "expiry_date": "2024-03-13",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 11,
      "book_id": 18,
      "reservation_date": "2024-02-22",
      "expiry_date": "2024-03-07",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 12,
      "book_id": 5,
      "reservation_date": "2024-02-19",
      "expiry_date": "2024-03-05",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 13,
      "book_id": 21,
      "reservation_date": "2024-02-24",
      "expiry_date": "2024-03-09",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    },
    {
      "user_id": 14,
      "book_id": 8,
      "reservation_date": "2024-02-26",
      "expiry_date": "2024-03-11",
      "status": "active",
      "created_at": "2025-10-09T00:00:00Z"
    }
];

const users = [
    {
      "username": "admin",
      "password_hash": "$2b$12$qsYe4uWwMr9fKFWBXnMUHuz.8nbEuu2RnPOkC7hBjQQwzfUiEhHyK",
      "email": "admin@library.com",
      "first_name": "John",
      "last_name": "Smith",
      "role": "admin",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "librarian1",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "librarian1@library.com",
      "first_name": "Sarah",
      "last_name": "Johnson",
      "role": "librarian",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "librarian2",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "librarian2@library.com",
      "first_name": "Michael",
      "last_name": "Brown",
      "role": "librarian",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member1",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member1@email.com",
      "first_name": "Mike",
      "last_name": "Davis",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member2",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member2@email.com",
      "first_name": "Emily",
      "last_name": "Wilson",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member3",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member3@email.com",
      "first_name": "David",
      "last_name": "Miller",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member4",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member4@email.com",
      "first_name": "Lisa",
      "last_name": "Taylor",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member5",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member5@email.com",
      "first_name": "James",
      "last_name": "Anderson",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member6",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member6@email.com",
      "first_name": "Karen",
      "last_name": "Thomas",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member7",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member7@email.com",
      "first_name": "Robert",
      "last_name": "Jackson",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member8",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member8@email.com",
      "first_name": "Nancy",
      "last_name": "White",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    },
    {
      "username": "member9",
      "password_hash": "$2b$10$K9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9.9",
      "email": "member9@email.com",
      "first_name": "Paul",
      "last_name": "Harris",
      "role": "member",
      "profile_image": null,
      "created_at": "2025-10-09T00:00:00Z",
      "updated_at": "2025-10-09T00:00:00Z",
      "is_active": true
    }
];

/*
    Database - create users table
    insert some users to users table
*/
function initTableUsers() {
  //db.run("DROP TABLE users");
  const createQuery = "CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL,\
                  email VARCHAR(100) UNIQUE NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL,\
                  role VARCHAR(20) DEFAULT 'member' CHECK(role IN ('admin', 'librarian', 'member')), profile_image VARCHAR(255),\
                  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME CURRENT_TIMESTAMP, is_active BOOLEAN DEFAULT 1)";
  db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table users create");
      users.forEach(async(user) => {
        const insertQuery = "INSERT INTO users(username, password_hash, email, first_name, last_name, role, profile_image, is_active) \
                                                values(?, ?, ?, ?, ?, ?, ?, ?)";
        //const password_hash = await generalFunction.hashPassword(user.password, 12);
        db.run(insertQuery, [user.username, user.password_hash, user.email, user.first_name, user.last_name,
          user.role, user.profile_image, user.is_active
        ], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into users table");
          }
        })
      })
    }
  })
}

/*
    Database - create Genre table
    insert some genres to ganres table
*/
function initTableGenres() {
  //db.run("DROP TABLE genres");
  const createQuery = "CREATE TABLE genres (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) UNIQUE NOT NULL,\
                            description TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)";
  db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table genres create");
      genres.forEach((genre) => {
        const insertQuery = "INSERT INTO genres(name, description) values(?, ?)";
        db.run(insertQuery, [genre.name, genre.description], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into genre table");
          }
        })
      })
    }
  })
}

/*
    Database - create publishers table
    insert some publishers to publishers table
*/
function initTablePublishers() {
  //db.run("DROP TABLE publishers");
  const createQuery = "CREATE TABLE publishers(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL,\
                        address TEXT, contact_email VARCHAR(100), website VARCHAR(255), established_year INTEGER,\
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)";
    db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table publishers create");
      publishers.forEach((publisher) => {
        const insertQuery = "INSERT INTO publishers(name, address, contact_email, website, established_year)\
                            values(?, ?, ?, ?, ?)";
        db.run(insertQuery, [publisher.name, publisher.address, publisher.contact_email, publisher.website, publisher.established_year], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into publisher table");
          }
        })
      })
    }
  })
}

/*
    Database - create authors table
    insert some authors to authors table
*/
function initTableAuthors() {
  //db.run("DROP TABLE authors");
  const createQuery = "CREATE TABLE authors(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, bio TEXT,\
                        nationality VARCHAR(50), birth_date DATE, death_date DATE, author_image VARCHAR(255),\
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)";
  db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table authors create");
      authors.forEach((author) => {
        const insertQuery = "INSERT INTO authors(name, bio, nationality, birth_date, death_date, author_image)\
                            values(?, ?, ?, ?, ?, ?)";
        db.run(insertQuery, [author.name, author.bio, author.nationality, author.birth_date, author.death_date, author.author_image], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into author table");
          }
        })
      })
    }
  })
}

/*
    Database - create books  table
    insert some books  to books  table
*/
function initTableBooks() {
  //db.run("DROP TABLE books ");
  const createQuery = "CREATE TABLE books ( id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL,\
                        isbn VARCHAR(20) UNIQUE, description TEXT, genre_id INTEGER NOT NULL, publisher_id INTEGER,\
                        publication_year INTEGER, edition VARCHAR(20), total_copies INTEGER DEFAULT 1,\
                        available_copies INTEGER DEFAULT 1, book_cover_image VARCHAR(255), language VARCHAR(30) DEFAULT 'English',\
                        page_count INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
                        FOREIGN KEY (genre_id) REFERENCES genres(id), FOREIGN KEY (publisher_id) REFERENCES publishers(id))";
    db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table books create");
      books.forEach((book) => {
        const insertQuery = "INSERT INTO books ( title, isbn, description, genre_id, publisher_id, publication_year, edition,\
                            total_copies, available_copies, book_cover_image, language, page_count)\
                            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.run(insertQuery, [book.title, book.isbn, book.description, book.genre_id, book.publisher_id, book.publication_year,
                            book.edition, book.total_copies, book.available_copies, book.book_cover_image, book.language, book.page_count
        ], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into books table");
          }
        })
      })
    }
  })
}

/*
    Database - create book_authors table
    insert some book_authors to book_authors table
*/
function initTableBook_authors() {
  //db.run("DROP TABLE publishers");
  const createQuery = "CREATE TABLE book_authors(id INTEGER PRIMARY KEY AUTOINCREMENT, book_id INTEGER NOT NULL,\
                        author_id INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
                        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,\
                        FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,\
                        UNIQUE(book_id, author_id))";
    db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table book_authors create");
      book_authors.forEach((book_author) => {
        const insertQuery = "INSERT INTO book_authors(book_id, author_id) values(?, ?)";
        db.run(insertQuery, [book_author.book_id, book_author.author_id], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into book_authors table");
          }
        })
      })
    }
  })
}

/*
    Database - create borrow_records table
    insert some borrow_records to borrow_records table
*/
function initTableBorrow_records() {
  //db.run("DROP TABLE publishers");
  const createQuery = "CREATE TABLE borrow_records(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,\
                        book_id INTEGER NOT NULL, borrow_date DATE NOT NULL, due_date DATE NOT NULL,\
                        return_date DATE, status VARCHAR(20) DEFAULT 'borrowed' CHECK(status IN ('borrowed', 'returned', 'overdue')),\
                        fine_amount DECIMAL(10,2) DEFAULT 0.00, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
                        FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (book_id) REFERENCES books(id))";
    db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table borrow_records create");
      borrow_records.forEach((borrow_record) => {
        const insertQuery = "INSERT INTO borrow_records(user_id, book_id, borrow_date, due_date, return_date, status, fine_amount)\
                            values(?, ?, ?, ?, ?, ?, ?)";
        db.run(insertQuery, [borrow_record.user_id, borrow_record.book_id, borrow_record.borrow_date, borrow_record.due_date,
            borrow_record.return_date, borrow_record.status, borrow_record.fine_amount
        ], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into borrow_records table");
          }
        })
      })
    }
  })
}

/*
    Database - create reservations table
    insert some publishers to reservations table
*/
function initTableReservations() {
  //db.run("DROP TABLE publishers");
  const createQuery = "CREATE TABLE reservations(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,\
                        book_id INTEGER NOT NULL, reservation_date DATE NOT NULL, expiry_date DATE NOT NULL,\
                        status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'fulfilled', 'cancelled')),\
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id),\
                        FOREIGN KEY (book_id) REFERENCES books(id))";
    db.run(createQuery, (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("----> Table reservations create");
      reservations.forEach((reservation) => {
        const insertQuery = "INSERT INTO reservations(user_id, book_id, reservation_date, expiry_date, status)\
                            values(?, ?, ?, ?, ?)";
        db.run(insertQuery, [reservation.user_id, reservation.book_id, reservation.reservation_date, reservation.expiry_date,
            reservation.status
        ], (error) => {
          if (error) {
            console.log("ERROR: ", error);
          } else {
            console.log("Line add into reservations table");
          }
        })
      })
    }
  })
}

function initAllTables(){
    initTableUsers();
    initTableGenres();
    initTablePublishers();
    initTableAuthors();
    initTableBooks();
    initTableBook_authors();
    initTableBorrow_records();
    initTableReservations();
}

module.exports = {initAllTables}