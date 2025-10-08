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

const {initTableUsers, getUsers, addUser} = require("./models/users");

/*
const sqlite3 = require("sqlite3");
const dbFile = "library.sqlite3";
db = new sqlite3.Database(dbFile);
*/
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

// member routes
const memberRoutes = require("./routers/memberRoutes");
app.use("/", memberRoutes);

// user books
const bookRoutes = require("./routers/bookRoutes");
app.use("/", bookRoutes);

async function printUsers(){
    try{
        const users = await getUsers();
        console.log(users.length);
        users.forEach((user)=>{
            console.log(user.username, "  : role: ", user.role);
        });
    }catch(error){
        console.log("ERROR: ", error);
    } 
};

app.listen(port, ()=>{
    //initTableUsers(db);  // create users table
    //printUsers();
    //addUser("fareeja", "00000", "fareeja@example.com", "daadir", "fareeja", "admin");
    //addUser("admin", "wdf#2025", "admin@admin.com", "admin", "admin", "admin");


    console.log(`Server is running on http://localhost:${port}`);
})