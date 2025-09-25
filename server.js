/*
    Abdulqaadir
    admin username: admin
    admin password: wdf#2025
*/

const express = require("express");
const {engine} = require("express-handlebars");
const app = express();

const port = 3000;

// handlebars
app.engine("handlebars", engine());
app.set("view handlebars", "handlebars");
app.set("views", "./views");

// test
const testRoutes = require("./routers/testRoutes");
app.use("/", testRoutes);

// home routes
const homeRoutes = require("./routers/homeRoutes");
app.use("/", homeRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})