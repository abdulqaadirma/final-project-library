/*
    Abdulqaadir Mohumed Ahmed - ahab24dy@student.ju.se

    Target grade: 5

    Web Dev Fun - 2025

    admin username: admin
    admin password: wdf#2025

    

*/
const express = require("express");
const {engine} = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectSqlite3 = require("connect-sqlite3");
const fileUpload = require("express-fileupload");
const path = require("path");

const {initAllTables} = require("./models/initAllDatabaseTalbles");

const app = express();

const port = 3000;

//form post method
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true, // Create parent directories if they don't exist
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}));

//static middleware
app.use(express.static("public"));

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

// error and dafault route
app.use((req, res)=>{
    res.status(404).render("error/404.handlebars");
})

// 500 error
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).render("error/500.handlebars");
})

app.listen(port, ()=>{
    //initAllTables();
    console.log(`Server is running on http://localhost:${port}`);
});