
function isAdminMiddleware(req, res, next){
    if(req.session.isLoggedIn && req.session.isAdmin){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/login");
        });
    }
}

function isMemberMiddleware(req, res, next){
    if(req.session.isLoggedIn && req.session.isMember){
        return next();
    }else{
        req.session.destroy(()=>{
            res.redirect("/login");
        });
    }
}

module.exports = {isAdminMiddleware, isMemberMiddleware};