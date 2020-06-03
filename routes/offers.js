const   express         = require("express"),
        Offer           = require("../models/offers"),
        Counter         = require("../models/counter"),
        router          = express.Router();
    
    // Fetch Offer Pages

    router.get("/pages", isLoggedIn,async function(req,res){

        var counte = await Counter.find(function( err,result){
            return result;
        })
        var cx = {count: (counte[0].count+1)};
        Counter.findOneAndUpdate(counte,cx,function(err,upd){
            if(err){
                console.log("failed");
            } else {
                console.log("updated")
            }
        })  
        var offurl = await Offer.find({toggle: true}, function(err,result){
            return result;
        });
        res.render("pages/pages",{offurl,counte});
    });

    // middleware

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

module.exports = router;