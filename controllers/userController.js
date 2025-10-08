const bcrypt = require("bcrypt");
const usersModel = require("../models/users");

function login(req, res){
    res.render("users/login.handlebars");
}
async function loginAuthoicate(req, res){
    const username = req.body.username;
    const password = req.body.password;
    if(username.length<=0 || password.length<=0){
        const model = {error: "Please enter username or email!"};
         return res.render("users/login.handlebars", model);
    }
    try{
        const user = await usersModel.getUserByUsernameOrEmail(username);
        //console.log(user);
        if(!user){
            const model = {error: "Wrong username or email! please try again"}
            return res.render("users/login.handlebars", model);
        }
        const chechPassword = await bcrypt.compare(password, user.password_hash);
        if(!chechPassword){
            const model = {error: "Wrong password! please try again"};
            return res.render("users/login.handlebars", model);
        }
        req.session.isLoggedIn = true;
        req.session.username = req.body.username;
        if(user.role === "member"){
            req.session.isMember = true;
            res.redirect("/memberDashboard");
        }else if(user.role === "admin"){
            req.session.isAdmin = true;
            res.redirect("/adminDashboard");
        }
    }catch(error){
        console.error("Login error:", error);
        res.render("users/login.handlebars", { error: "Unexpected error, try again later." });
    }
}

function create(req, res){
    res.render("users/create.handlebars");
}
async function store(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(username.length<=0 || password.length<=0 || email.length<=0 || firstName.length<=0 || lastName.length<=0){
        const model = {error: "Please fill all input"};
         return res.render("users/login.handlebars", model);
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
        res.render("users/login.handlebars");
    }catch(error){
        console.log("Error: ", error);
        model = {error: "Failed to create account"};
        res.render("users/create.handlebars", model);
    }
}

function logout(req, res){
    req.session.destroy((error)=>{
        if(error){
            console.log("Error while destroying the session: ", error);
            res.redirect("/")
        }else{
            //console.log("Logged out");
            res.redirect("/");
        }
    })
}


module.exports = {login, loginAuthoicate, create, store, logout};