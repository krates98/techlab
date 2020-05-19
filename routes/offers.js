const   express         = require("express"),
        Offer           = require("../models/offers"),
        router          = express.Router();
    
    // Fetch Offer Pages

    router.get("/pages", isLoggedIn,async function(req,res){
        var offurl = await Offer.find(function(err,result){
            return result;
        });
        res.render("pages/pages",{offurl});
    });

    // middleware

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

module.exports = router;