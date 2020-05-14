const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        ipAdd           = require("../models/ipaddress"),
        User            = require("../models/user"),
        moment          = require('moment'),
        multer          = require('multer'),
        csv             = require('fast-csv'),
        fs              = require('fs'),
        http            = require('http'),
        Chart           = require('chart.js');

        // SET STORAGE
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, 'uploads')
            },
            filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.csv')
            }
        })
   
        var upload = multer({ storage: storage })


        // Admin Landing Page
        router.get("/admin", isLoggedIn,async function(req,res){
            var datime      = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
            var datime1     = moment().utc().subtract(18, 'hours').subtract(30,'m').format("DD/MM/YYYY");
            var datime2     = moment().utc().subtract(43, 'hours').subtract(30,'m').format("DD/MM/YYYY");
            var datime3     = moment().utc().subtract(67, 'hours').subtract(30,'m').format("DD/MM/YYYY");
            var datime4     = moment().utc().subtract(91, 'hours').subtract(30,'m').format("DD/MM/YYYY");
            var datcount1   = await ipAdd.countDocuments({ date: datime },function(err,result){
                return result;
            });
            var datcount2   = await ipAdd.countDocuments({ date: datime1 },function(err,result){
                return result;
            });
            var datcount3   = await ipAdd.countDocuments({ date: datime2 },function(err,result){
                return result;
            });
            var datcount4   = await ipAdd.countDocuments({ date: datime3 },function(err,result){
                return result;
            });
            var datcount5   = await ipAdd.countDocuments({ date: datime4 },function(err,result){
                return result;
            });
            var dat        = [datime,datime1,datime2,datime3,datime4];
            var dac        = [datcount1,datcount2,datcount3,datcount4,datcount5]
                res.render("admin/index",{dat,dac});
        });

        // Admin Today's Work

        router.get("/admin/todaywork", isLoggedIn, function(req,res){
                var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
                ipAdd.find({date: datime}, function(err,today){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render("admin/todaywork",{today:today});
                        }
                });
        });

        
        // Admin Register User

        router.get("/admin/register", isLoggedIn, function(req,res){
            res.render("admin/register");
        });

        // Admin UserWork

        router.get("/admin/userwork", isLoggedIn, function(req,res){
            var noMatch = null;
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
                        });

        // Admin Data Left
        router.get("/admin/dataleft", isLoggedIn, function(req,res){
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
        });

        // Admin HitList Page
        router.get("/admin/hitlist", isLoggedIn, function(req,res){
            res.render("admin/hitList", );
        });

        router.post('/admin/hitlist', isLoggedIn, upload.single('myFile'), (req, res, next) => {
            
            const file = req.file
            if (!file) {
              const error = new Error('Please upload a file')
              error.httpStatusCode = 400
              return next(error)
            }
            var wooo = 0;
            const fileRows = [];
            // open uploaded file
            
                csv .parseFile(req.file.path, {headers: true})
                .on("data", function(data) {
                fileRows.push(data); // push each row
                })
                .on("end", function() {
                fs.unlinkSync(req.file.path);
                User.find(function(err, workers){
                ipAdd.find(function(err,ipad){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render("admin/hitlist2",{ipad:ipad, fileRows:fileRows, workers:workers, wooo:wooo});
                        }
                    });
                });
            });
        });
        
        // Admin Upload Email
        router.get("/admin/uploademail", isLoggedIn, function(req,res){
            res.render("admin/uploademail", );
        });

        router.post('/admin/uploademail', isLoggedIn, upload.single('myFile'), (req, res, next) => {
            
            const file = req.file
            if (!file) {
              const error = new Error('Please upload a file')
              error.httpStatusCode = 400
              return next(error)
            }

            const emailRows = [];
            // open uploaded file
            
                csv .parseFile(req.file.path, {headers: true})
                .on("data", function(data) {
                emailRows.push(data); // push each row
                })
                .on("end", function() {
                fs.unlinkSync(req.file.path);
                emailRows.forEach(function(bean){
                    Email.create(bean, function(err, email){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added email");
                        }
                    });
                });
                res.render("admin/uploademail2")
            });
        });

        // middleware

        function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            var usher = req.user.username;
            if(usher === "krates"){
            return next();
            }
            else {
                res.send("Not Authorised");
            }
        }
       res.redirect("/login");
        }

        module.exports = router;