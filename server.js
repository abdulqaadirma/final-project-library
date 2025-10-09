/*
    Abdulqaadir Mohumed Ahmed - ahab24dy@student.ju.se
    admin username: admin
    admin password: wdf#2025
*/
const express = require("express");
const {engine} = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectSqlite3 = require("connect-sqlite3");

const {initTableUsers} = require("./models/users");
const {initAllAboutBooks} = require("./models/books");

const app = express();

const port = 3000;

//static middleware
app.use(express.static("public"));

//form post method
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// session midleware
const SQLiteStore = connectSqlite3(session) // store sessions in the database
//--- DEFINE THE SESSION
app.use(session({ // define the session
    store: new SQLiteStore({db: "session-db.db"}),
    "saveUninitialized": false,
    "resave": false,
    "secret": "This123Is@Another#456GreatSecret678%Sentence"
}));

// make the sessions available all handlebars filese at onne!
app.use((req, res, next)=>{
    res.locals.session = req.session;
    next();
});

// handlebars middleware
app.engine("handlebars", engine({
    helpers: {
        eq (a, b){return a==b;}
    }
}));
app.set("view handlebars", "handlebars");
app.set("views", "./views");

// user routes
const userRoutes = require("./routers/userRoutes");
app.use("/", userRoutes);

// admin routes
const adminRoutes = require("./routers/adminRoutes");
app.use("/", adminRoutes);

// librarian routes
const librarianRoutes = require("./routers/librarianRoutes");
app.use("/", librarianRoutes);

// member routes
const memberRoutes = require("./routers/memberRoutes");
app.use("/", memberRoutes);

// user books
const bookRoutes = require("./routers/bookRoutes");
app.use("/", bookRoutes);

app.listen(port, ()=>{
    //initTableUsers();  // create users table 
    initAllAboutBooks();
    console.log(`Server is running on http://localhost:${port}`);
})