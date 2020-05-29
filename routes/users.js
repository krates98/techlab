const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        User            = require("../models/user"),
        ipAdd           = require("../models/ipaddress"),
        Att             = require("../models/attendance"),
        request         = require("request-promise"),
        moment          = require('moment');

    // User Profile 
    router.get("/users/attendance", isLoggedIn, function(req,res){
        var reas;
        Att.find({date: moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY")}, function(err, attData){
            if(err){
                console.log(err);
            }
            else{
                for(var i=0;i<attData.length;i++){
                if(req.user.username === attData[i].username){
                reas = attData[i].reason;
                return res.render("users/submitted",{reas});
                }
              };
        res.render("users/attendance");
        }
    });
});

    // User Profile 
    router.post("/users/attendance", isLoggedIn, function(req,res){
        var userne  = req.user.username;
        var reason = req.body.reason;
        var quantity = req.body.quantity;
        var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
        var attcreate  = {username: userne, date: datime, overtime: quantity, reason: reason}; 
        Att.create(attcreate, function(err, email){
            if(err){
                console.log(err)
                } 
            });
                res.redirect("/users/attendance");
        });

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