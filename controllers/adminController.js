const usersModel = require("../models/users");
const bookModel = require("../models/books");

async function dashboard(req, res){
    const totalUsers = await bookModel.totalUsers();
    const totalBooks = await bookModel.totalBooks();
    const totalAuthors = await bookModel.totalAuthors();
    const totalGenres = await bookModel.totalGenres();
    const totalPublishers = await bookModel.totalPublishers();
    const model = {totalUsers, totalBooks, totalAuthors, totalGenres, totalPublishers};
    res.render("dashboard/dashboard.handlebars", model);
}

async function adminUserManagement(req, res){
    const users = await usersModel.adminGetUsers();
    model = {users};
    res.render("dashboard/adminUserManagement.handlebars", model);
}

function adminCreate(req, res){
    res.render("users/create.handlebars")
}

async function adminStore(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if(username.length<=0 || password.length<=0 || email.length<=0 || firstName.length<=0 || lastName.length<=0){
        const model = {error: "Please fill all input"};
         return res.render("users/create.handlebars", model);
    }

    try{
        // check if username or email already exist
        const usernameExist = await usersModel.getUserByUsernameOrEmail(username);
        const emailExist = await usersModel.getUserByUsernameOrEmail(email);

        if(usernameExist && username === usernameExist.username){
            model = {error: "username already taken"};
            return res.render("users/create.handlebars", model)
        }
        if(emailExist && email === emailExist.email){
            model = {error: "email already taken"};
            return res.render("users/create.handlebars", model)
        }

        const result = await usersModel.addUser(username, password, email, firstName, lastName, role);
        //console.log(result);
        res.redirect("/adminUserManagement")
    }catch(error){
        res.render("users/create.handlebars");
    }
}

async function adminEdit(req, res){
    const id = req.params.id;
    const user = await usersModel.getUserById(id);
    const model = {user}
    res.render("users/edit.handlebars", model);
}

async function adminUpdate(req, res) {
    const id = req.params.id;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if(username.length<=0 || password.length<=0 || email.length<=0 || firstName.length<=0 || lastName.length<=0){
        const user = await usersModel.getUserByUsernameOrEmail(username);
        const model = {user, error: "Please fill all input"}
       return res.render("users/edit.handlebars", model);
    }

    try{
        const updatedUser = await usersModel.updateUser(id, password, firstName, lastName, role);  
        
        res.redirect("/adminUserManagement");
    }catch(error){
        console.log(error);
        res.render("users/edit.handlebars");
    }

}

async function adminDelete(req, res) {
    const id = req.params.id;
    const deletedUser = await usersModel.deleteUser(id);
    res.redirect("/adminUserManagement");
}


module.exports = {dashboard, adminUserManagement, adminCreate, adminStore, adminEdit, adminUpdate, adminDelete};