const   express         = require("express"),
        router          = express.Router(),
        ipAdd           = require("../models/ipaddress"),
        User            = require("../models/user");

        router.get("/admin", isLoggedIn, function(req,res){
            var noMatch = null;
            var usher = req.user.username;
                if(usher === "krates"){
                    if(req.query.users){
                        const users = req.query.users;
                        const day = req.query.day;
                        const month = req.query.month;
                        const year = req.query.year;
                        const date = day +"/"+ month +"/"+ year;
                        ipAdd.find({username: users, date: date}, function(err, ipad){
                            if(err){
                                console.log(err);
                                } else {
                                    noMatch = "has";
                                    if(ipad.length < 1) {
                                        noMatch = "had";
                                                            }
                                    res.render("admin",{ipad:ipad, noMatch: noMatch});
                                        }
                            });
                        }
                            else{
                                ipAdd.find(function(err,ipad){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        res.render("admin",{ipad:ipad, noMatch:noMatch});
                                        }
                                });
                            }
                }
                else{
                    res.send("Not Authorised");
                }
        });

        // middleware

        function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

        module.exports = router;