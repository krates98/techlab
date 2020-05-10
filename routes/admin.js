const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        ipAdd           = require("../models/ipaddress"),
        User            = require("../models/user"),
        moment          = require('moment');

        
        // Admin Landing Page
        router.get("/admin", isLoggedIn, function(req,res){
            var usher = req.user.username;
            if(usher === "krates"){
                res.render("admin/index");
            }
            else {
                res.send("Not Authorised");
            }
        });

        // Admin Today's Work

        router.get("/admin/todaywork", isLoggedIn, function(req,res){
            var usher = req.user.username;
            if(usher === "krates"){
                var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
                ipAdd.find({date: datime}, function(err,today){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render("admin/todaywork",{today:today});
                        }
                });
            }
            else {
                res.send("Not Authorised");
            }
        });

        
        // Admin Register User

        router.get("/admin/register", isLoggedIn, function(req,res){
            var usher = req.user.username;
            if(usher === "krates"){
                res.render("admin/register");
            }
            else {
                res.send("Not Authorised");
            }
        });

        // Admin UserWork

        router.get("/admin/userwork", isLoggedIn, function(req,res){
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
                                    res.render("admin/userwork",{ipad:ipad, noMatch: noMatch});
                                        }
                            });
                        }
                            else{
                                ipAdd.find(function(err,ipad){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        res.render("admin/userwork",{ipad:ipad, noMatch:noMatch});
                                        }
                                });
                            }
                }
                else{
                    res.send("Not Authorised");
                }
        });

        // Admin Data Left
        router.get("/admin/dataleft", isLoggedIn, function(req,res){
            var usher = req.user.username;
            if(usher === "krates"){
                var noMatch = null;
                if(req.query.state){
                    const state = req.query.state;
                    Data.find({state: state}, function(err, sta){
                    if(err){
                        console.log(err);
                    }
                    else{
                        noMatch = "has";
                        if(sta.length < 1){
                            noMatch = "had";
                        }
                        const stalen = sta.length;
                        res.render("admin/dataleft", {state:state, stalen:stalen, noMatch:noMatch})
                    }
                    });
                }
                else{
                    Email.find(function(err,ipad){
                        if(err){
                            console.log(err);
                        }
                        else{
                            const emalen = ipad.length;
                            res.render("admin/dataleft",{emalen:emalen, noMatch:noMatch});
                            }
                    });
                }
                 }
            else {
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