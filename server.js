/*
    Abdulqaadir Mohumed Ahmed - ahab24dy@student.ju.se
    admin username: admin
    admin password: wdf#2025
*/
const express = require("express");
const {engine} = require("express-handlebars");
const sqlite3 = require("sqlite3");

const {initTableUsers} = require("./models/users");

const dbFile = "library.sqlite3";

db = new sqlite3.Database(dbFile);

const app = express();

const port = 3000;

// handlebars middleware
app.engine("handlebars", engine());
app.set("view handlebars", "handlebars");
app.set("views", "./views");

// test routes
const testRoutes = require("./routers/testRoutes");
app.use("/", testRoutes);

// home routes
const homeRoutes = require("./routers/homeRoutes");
app.use("/", homeRoutes);

app.listen(port, ()=>{
    //initTableUsers(db);  // create users table
    console.log(`Server is running on http://localhost:${port}`);
})