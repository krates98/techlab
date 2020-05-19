const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        User            = require("../models/user"),
        ipAdd           = require("../models/ipaddress"),
        request         = require("request-promise"),
        moment          = require('moment');


    // User Profile 
    router.get("/users/:id", isLoggedIn, function(req,res){
        res.render("users/userprofile");
    });

    // User Post Route 
    router.put("/users/:id", isLoggedIn, function(req,res){
	User.findByIdAndUpdate(req.params.id, req.body, function(err,updateduser){
		if(err){
			res.redirect("/users/" + req.params.id);
		}
		else{
			res.redirect("/users/" + req.params.id);    
		}
	});
});


     // middleware

     function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

    module.exports = router;