const   express         = require("express"),
        router          = express.Router();
    
    // Fetch Offer Pages

    router.get("/pages", isLoggedIn, function(req,res){
        res.render("pages");
    });

    // middleware

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

module.exports = router;