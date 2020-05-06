const   express         = require("express"),
        router          = express.Router({mergeParams: true});

        router.get("/admin", isLoggedIn, function(req,res){
            res.render("admin");
        });

        // middleware

        function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

        module.exports = router;