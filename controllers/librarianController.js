const usersModel = require("../models/users");

function librarianDashboard(req, res){
    res.render("dashboard/librarianDashboard.handlebars");
}

async function librarianUserManagement(req, res){
    const users = await usersModel.librarianGetUsers();
    model = {users};
    res.render("dashboard/librarianUserManagement.handlebars", model);
}

function librarianCreate(req, res){
    res.render("users/create.handlebars")
}

async function librarianStore(req, res) {
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

        const result = await usersModel.addUser(username, password, email, firstName, lastName, "member");
        //console.log(result);
        res.redirect("/librarianUserManagement")
    }catch(error){
        res.render("users/create.handlebars");
    }
}

async function librarianEdit(req, res){
    const id = req.params.id;
    const user = await usersModel.getUserById(id);
    //console.log(user.username);
    const model = {user};
    res.render("users/edit.handlebars", model);
}

async function librarianUpdate(req, res) {
    const id = req.params.id;
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    if(username.length<=0 || password.length<=0 || email.length<=0 || firstName.length<=0 || lastName.length<=0){
        const user = await usersModel.getUserByUsernameOrEmail(username);
        const model = {user, error: "Please fill all input"}
       return res.render("users/edit.handlebars", model);
    }

    try{
        const updatedUser = await usersModel.updateUser(id, password, firstName, lastName, "member");   

        res.redirect("/librarianUserManagement");
    }catch(error){
        console.log(error);
        res.render("users/edit.handlebars");
    }
}

async function librarianDelete(req, res) {
    const id = req.params.id;
    const deletedUser = await usersModel.deleteUser(id);
    res.redirect("/librarianUserManagement");
}


module.exports = {librarianDashboard, librarianUserManagement, librarianCreate, librarianStore, librarianEdit, librarianUpdate, librarianDelete};