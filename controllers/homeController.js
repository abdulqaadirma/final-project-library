const bycrpt = require("bcrypt");

async function homeController(req, res){
    const encPass = await encrypt("fareeja")
    console.log(encPass);
    const decPass = await decrypt("fareeja", encPass)
    console.log(decPass);
    res.render("home/home.handlebars");
}


async function encrypt(pass){
    const salt = await bycrpt.genSalt(10);
    pass = await bycrpt.hash(pass, salt);
    return pass
}

async function decrypt(pass, hashPass) {
    return await bycrpt.compare(pass, hashPass);
}

module.exports = {homeController};