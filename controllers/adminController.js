const usersModel = require("../models/users");

function adminDashboard(req, res){
    res.render("dashboard/adminDashboard.handlebars");
}

async function adminUserManagement(req, res){
    const users = await usersModel.getUsers();
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
         return res.render("users/login.handlebars", model);
    }
    console.log("username: ",username);

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
        console.log(result);
        res.redirect("/adminUserManagement")
    }catch(error){
        res.render("users/create.handlebars");
    }
}

async function adminEdit(req, res){
    const username = req.params.username;
    const user = await usersModel.getUserByUsernameOrEmail(username);
    const model = {user}
    res.render("users/edit.handlebars", model);
}

async function adminUpdate(req, res) {
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
        const updatedUser = await usersModel.updateUser(username, password, email, firstName, lastName, role);        
        res.redirect("/adminUserManagement");
    }catch(error){
        console.log(error);
        res.render("users/edit.handlebars");
    }

}

async function adminDelete(req, res) {
    const username = req.params.username;
    const deletedUser = await usersModel.deleteUser(username);
    res.redirect("/adminUserManagement");
}


module.exports = {adminDashboard, adminUserManagement, adminCreate, adminStore, adminEdit, adminUpdate, adminDelete};