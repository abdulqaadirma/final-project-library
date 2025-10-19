
function isAdminMiddleware(req, res, next){
    if(req.session.isLoggedIn && req.session.isAdmin){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/erorr/404.handlebars");
        });
    }
}

function isLibrarianMiddleware(req, res, next){
    if(req.session.isLoggedIn && req.session.isLibrarian){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/erorr/404.handlebars");
        });
    }
}

function isMemberMiddleware(req, res, next){
    if(req.session.isLoggedIn && req.session.isMember){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/erorr/404.handlebars");
        });
    }
}

function isAdminOrLibrarianMiddleware(req, res, next){
    if(req.session.isLoggedIn && (req.session.isAdmin || req.session.isLibrarian)){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/erorr/404.handlebars");
        });
    }
}

function isAdminOrLibrarianOrMemberMiddleware(req, res, next){
    if(req.session.isLoggedIn && (req.session.isAdmin || req.session.isLibrarian || req.session.isMember)){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/erorr/404.handlebars");
        });
    }
}

module.exports = {isAdminMiddleware, isMemberMiddleware, isLibrarianMiddleware, isAdminOrLibrarianMiddleware, isAdminOrLibrarianOrMemberMiddleware};