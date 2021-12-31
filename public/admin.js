const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        ipAdd           = require("../models/ipaddress"),
        User            = require("../models/user"),
        Offer           = require("../models/offers"),
        Att             = require("../models/attendance"),  
        Hitlist         = require("../models/hitlist"),
        Storehit        = require("../models/storehit"),
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

        router.get("/admin/todaywork", isLoggedIn,async function(req,res){
                var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
                var today     = await ipAdd.find({date: datime}, function(err,todee){
                                    return todee;
                                });
                var worker    = await User.find(function(err,uss){
                                    return uss;
                                })
                res.render("admin/todaywork",{today,worker});
        });

        // Admin Yesterday's Work

        router.get("/admin/yesterdaywork", isLoggedIn,async function(req,res){
                var datime    = moment().utc().subtract(18, 'hours').subtract(30,'m').format("DD/MM/YYYY");
                var today     = await ipAdd.find({date: datime}, function(err,todee){
                                    return todee;
                                });
                var worker    = await User.find(function(err,uss){
                                    return uss;
                                })
                res.render("admin/yesterdaywork",{today,worker});
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
                                    User.find(function(err, ussr){
                                    res.render("admin/userwork",{ipad:ipad,ussr:ussr,noMatch});
                                    });
                                    }
                            });
                        }
                            else{
                                ipAdd.find(function(err,ipad){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        User.find(function(err, ussr){
                                        res.render("admin/userwork",{ipad:ipad,ussr:ussr, noMatch:noMatch});
                                        });
                                    }
                                });
                            }
                        });

        // Admin Data Left
        router.get("/admin/dataleft", isLoggedIn, async function(req,res){
            var AZ   = await Data.countDocuments({ state: "AZ" },function(err,result){
                return result;
            });
            var CA   = await Data.countDocuments({ state: "CA" },function(err,result){
                return result;
            });
            var CO   = await Data.countDocuments({ state: "CO" },function(err,result){
                return result;
            });
            var CT   = await Data.countDocuments({ state: "CT" },function(err,result){
                return result;
            });
            var FL   = await Data.countDocuments({ state: "FL" },function(err,result){
                return result;
            });
            var GA   = await Data.countDocuments({ state: "GA" },function(err,result){
                return result;
            });
            var ID   = await Data.countDocuments({ state: "ID" },function(err,result){
                return result;
            });
            var IL   = await Data.countDocuments({ state: "IL" },function(err,result){
                return result;
            });
            var IN   = await Data.countDocuments({ state: "IN" },function(err,result){
                return result;
            });
            var IA   = await Data.countDocuments({ state: "IA" },function(err,result){
                return result;
            });
            var MD   = await Data.countDocuments({ state: "MD" },function(err,result){
                return result;
            });
            var MA   = await Data.countDocuments({ state: "MA" },function(err,result){
                return result;
            });
            var MI   = await Data.countDocuments({ state: "MI" },function(err,result){
                return result;
            });
            var NE   = await Data.countDocuments({ state: "NE" },function(err,result){
                return result;
            });
            var NV   = await Data.countDocuments({ state: "NV" },function(err,result){
                return result;
            });
            var NJ   = await Data.countDocuments({ state: "NJ" },function(err,result){
                return result;
            });
            var TX   = await Data.countDocuments({ state: "TX" },function(err,result){
                return result;
            });
            var UT   = await Data.countDocuments({ state: "UT" },function(err,result){
                return result;
            });
            var VA   = await Data.countDocuments({ state: "VA" },function(err,result){
                return result;
            });
            var WA   = await Data.countDocuments({ state: "WA" },function(err,result){
                return result;
            });

            var EMAIL   = await Email.countDocuments(function(err,result){
                return result;
            });

            var stes =[AZ,CA,CO,CT,FL,GA,ID,IL,IN,IA,MD,MA,MI,NE,NV,NJ,TX,UT,VA,WA];

            res.render("admin/dataleft",{stes, EMAIL});

                });

        // Admin HitList Page
        router.get("/admin/hitlist", isLoggedIn, function(req,res){
            res.render("admin/hitlist", );
        });

        router.post('/admin/hitlistsuccess', isLoggedIn, upload.single('myFile'), (req, res, next) => {
            
            const file = req.file
            if (!file) {
              const error = new Error('Please upload a file')
              error.httpStatusCode = 400
              return next(error)
            }
            const hitRows = [];
            var hitcreate;
            var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");

            // open uploaded file
            
                csv .parseFile(req.file.path, {headers: true})
                .on("data", function(data) {
                hitRows.push(data); // push each row
                
                })
                .on("end",async function() {
                fs.unlinkSync(req.file.path);
                hitRows.forEach(function(bean){
                    hitcreate  = {offer1:bean.offer1, offer2:bean.offer2, offer3:bean.offer3, offer4:bean.offer4, offer5:bean.offer5, date: datime}; 
                    Hitlist.create(hitcreate, function(err, userdata){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added hitlist");
                        }
                    });
                });
                res.render("admin/hitlistsuccess");
            });     
        });

        
        // Admin HitList Page
        router.get("/admin/checkhitlist", isLoggedIn,async function(req,res){
            
            var workers = await User.find(function(err,work){
                return work;
            })

            var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");

            var join = await Hitlist.aggregate(
                [  
                    { $lookup:
                        {
                            from:"ipaddresses",
                            localField:"offer1",
                            foreignField:"ipaddress",
                            as:"newhitlist"
                        }
                    },
                        {
                            $unwind: '$newhitlist'
                        },{
                            $project: {

                              username: '$newhitlist.username',
                              ipaddress: '$newhitlist.ipaddress',
                              date: '$newhitlist.date'

                            }
                        }

                    ]).exec();
            
        var join2 = await Hitlist.aggregate(
                [  
                    { $lookup:
                        {
                            from:"ipaddresses",
                            localField:"offer2",
                            foreignField:"ipaddress",
                            as:"newhitlist"
                        }
                    },
                        {
                            $unwind: '$newhitlist'
                        },{
                            $project: {

                              username: '$newhitlist.username',
                              ipaddress: '$newhitlist.ipaddress',
                              date: '$newhitlist.date'

                            }
                        }

                    ]).exec();
        
        var join3 = await Hitlist.aggregate(
                [  
                    { $lookup:
                        {
                            from:"ipaddresses",
                            localField:"offer3",
                            foreignField:"ipaddress",
                            as:"newhitlist"
                        }
                    },
                        {
                            $unwind: '$newhitlist'
                        },{
                            $project: {

                              username: '$newhitlist.username',
                              ipaddress: '$newhitlist.ipaddress',
                              date: '$newhitlist.date'

                            }
                        }

                    ]).exec();
        var join4 = await Hitlist.aggregate(
                [  
                    { $lookup:
                        {
                            from:"ipaddresses",
                            localField:"offer4",
                            foreignField:"ipaddress",
                            as:"newhitlist"
                        }
                    },
                        {
                            $unwind: '$newhitlist'
                        },{
                            $project: {

                              username: '$newhitlist.username',
                              ipaddress: '$newhitlist.ipaddress',
                              date: '$newhitlist.date'

                            }
                        }

                    ]).exec();

        var join5 = await Hitlist.aggregate(
                [  
                    { $lookup:
                        {
                            from:"ipaddresses",
                            localField:"offer5",
                            foreignField:"ipaddress",
                            as:"newhitlist"
                        }
                    },
                        {
                            $unwind: '$newhitlist'
                        },{
                            $project: {

                              username: '$newhitlist.username',
                              ipaddress: '$newhitlist.ipaddress',
                              date: '$newhitlist.date'

                            }
                        }

                    ]).exec();
                
                var off1arr=[];
                var wooo=0;

                for(var i=1;i<workers.length;i++){
                    for(var j=0;j<join.length;j++){
                        if(workers[i].username === join[j].username){
                            wooo++
                        }
                    }
                    off1arr.push(wooo);
                    wooo=0;
                }

                var off2arr=[];

                for(var i=1;i<workers.length;i++){
                    for(var j=0;j<join2.length;j++){
                        if(workers[i].username === join[j].username){
                            wooo++
                        }
                    }
                    off2arr.push(wooo);
                    wooo=0;
                }
                var off3arr=[];
                for(var i=1;i<workers.length;i++){
                    for(var j=0;j<join3.length;j++){
                        if(workers[i].username === join[j].username){
                            wooo++
                        }
                    }
                    off3arr.push(wooo);
                    wooo=0;
                }
                var off4arr=[];
                for(var i=1;i<workers.length;i++){
                    for(var j=0;j<join4.length;j++){
                        if(workers[i].username === join[j].username){
                            wooo++
                        }
                    }
                    off4arr.push(wooo);
                    wooo=0;
                }
                var off5arr=[];
                for(var i=1;i<workers.length;i++){
                    for(var j=0;j<join5.length;j++){
                        if(workers[i].username === join[j].username){
                            wooo++
                        }
                    }
                    off5arr.push(wooo);
                    wooo=0;
                }
                await Hitlist.deleteMany();
                res.render("admin/checkhitlist",{workers,off1arr,off2arr,off3arr,off4arr,off5arr});
               
        });
            
        // Admin Upload Email
        router.get("/admin/uploademail", isLoggedIn, function(req,res){
            res.render("admin/uploademail");
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

        // Admin Attendance Current Month 
        router.get("/admin/attendance", isLoggedIn,async function(req,res){
            var worker = await User.find(function(err,work){
                return work;
            })

            var dates = await ipAdd.find({date: {$regex: "\/"+ moment().utc().add(5, 'hours').add(30,'m').format("MM") +"\/2020"}, time: { $regex: "PM"}},function(err,work){
                return work;
            })
            var daysd = moment().utc().add(5, 'hours').add(30,'m').format("D");
            var curm = moment().utc().add(5, 'hours').add(30,'m').format("MM");
            var xax;
            var arr =[];
            var cx = 0;
            
            res.render("admin/attendance",{worker,dates,xax,arr,cx,daysd,curm}) ;
        });

        // Admin Attendance Last Month 
        router.get("/admin/lastmonth", isLoggedIn,async function(req,res){
            var worker = await User.find(function(err,work){
                return work;
            })

            var dates = await ipAdd.find({date: {$regex: "\/"+ moment().utc().add(5, 'hours').add(30,'m').subtract(1, 'months').format("MM") +"\/2020"}, time: { $regex: "PM"}},function(err,work){
                return work;
            })
            var daysd = moment().utc().add(5, 'hours').add(30,'m').subtract(1, 'months').daysInMonth();
            var lasm = moment().utc().subtract(1, 'months').format("MM");
            var xax;
            var arr =[];
            var cx = 0;
            res.render("admin/attendance2",{worker,dates,xax,arr,cx,daysd,lasm}) ;
        });
        
        // Admin Upload Data
        router.get("/admin/uploaddata", isLoggedIn, function(req,res){
            res.render("admin/uploaddata", );
        });

        router.post('/admin/uploaddata', isLoggedIn, upload.single('myFile'), (req, res, next) => {
            
            const file = req.file
            if (!file) {
              const error = new Error('Please upload a file')
              error.httpStatusCode = 400
              return next(error)
            }

            const dataRows = [];
            // open uploaded file
            
                csv .parseFile(req.file.path, {headers: true})
                .on("data", function(data) {
                dataRows.push(data); // push each row
                })
                .on("end", function() {
                fs.unlinkSync(req.file.path);
                dataRows.forEach(function(bean){
                    Data.create(bean, function(err, userdata){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added data");
                        }
                    });
                });
                res.render("admin/uploaddata2")
            });
        });

        // Admin Update Offers
         router.get("/admin/offers", isLoggedIn,async function(req,res){
            var offurl = await Offer.find(function(err,offig){
                return offig;
            });
            res.render("admin/offers",{offurl});
        });

        // Admin Post Update Offers
        router.post("/admin/offers", isLoggedIn, async function(req,res){
            var insput = req.body.offerurl;
            var off = req.body.offername;
            
            var addoff = {offerurl:insput, offername:off, toggle:false, priority:1};
                
            Offer.create(addoff, function(err, email){
                if(err){
                    console.log(err)
                    }
                    else{
                        console.log("added offer")
                    } 
                });
            
            res.redirect("/admin/offers");
        });

        router.post("/admin/offers/:id", function(req, res){
                var togg;
            if(req.body.on === "on"){
                togg = {toggle:false};
            } else {
                togg = {toggle:true};
            }
            Offer.findByIdAndUpdate(req.params.id, togg, function(err, blog){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/admin/offers");
                }
            });
         });
         
         router.put("/admin/offers/:id", isLoggedIn,function(req,res){
            var seu = {priority: req.body.pri};
            Offer.findByIdAndUpdate(req.params.id,seu, function(err,random){
                if(err){
                    console.log("Error");
                } else {
                    res.redirect("/admin/offers");
                }
            });   
       });
         
        router.delete("/admin/offers/:id", function(req, res){
            Offer.findById(req.params.id, function(err, offrm){
                if(err){
                    console.log(err);
                } else {
                    offrm.remove();
                    res.redirect("/admin/offers");
                }
            });
            
         });

        // Admin Salary User

        router.get("/admin/salary", isLoggedIn,async function(req,res){
            var userdata = await User.find(function (err,userd){
                return userd;
            })
            res.render("admin/salary",{userdata});
        });

         // Admin Salary Post

         router.post("/admin/salary", isLoggedIn,function(req,res){
             var sal = {salary: req.body.salary};
             var seu = {username: req.body.users};
             User.findOneAndUpdate(seu, sal,async function(err, blog){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/admin/salary");
                }
            });
        });

        // Admin Generate Salary

        router.get("/admin/gensalary", isLoggedIn,async function(req,res){
            
            var worker = await User.find(function(err,work){
                return work;
            })

            var dates = await ipAdd.find({date: {$regex: "\/"+ moment().utc().add(5, 'hours').add(30,'m').format("MM") +"\/2020"}, time: { $regex: "PM"}},function(err,work){
                return work;
            })

            var attrea = await Att.find({date: {$regex: "\/"+ moment().utc().add(5, 'hours').add(30,'m').format("MM") +"\/2020"}},function(err,work){
                return work;
            })
            var daysm = moment().utc().add(5, 'hours').add(30,'m').daysInMonth();
            var daysd = moment().utc().add(5, 'hours').add(30,'m').format("D");
            var curm = moment().utc().add(5, 'hours').add(30,'m').format("MM");
            var xax;
            var arr =[];
            var cx = 0;
            var dsal = 0;
            
            res.render("admin/gensalary",{worker,dates,xax,arr,cx,daysd,curm,dsal,daysm,attrea}) ;
        });

        // Admin Generate Last Month Salary

        router.get("/admin/gensalarylm", isLoggedIn,async function(req,res){
            
            var worker = await User.find(function(err,work){
                return work;
            })

            var dates = await ipAdd.find({date: {$regex: "\/"+ moment().utc().add(5, 'hours').add(30,'m').subtract(1, 'months').format("MM") +"\/2020"}, time: { $regex: "PM"}},function(err,work){
                return work;
            })

            var attrea = await Att.find({date: {$regex: "\/"+ moment().utc().add(5, 'hours').add(30,'m').subtract(1, 'months').format("MM") +"\/2020"}},function(err,work){
                return work;
            })
            var daysm = moment().utc().add(5, 'hours').add(30,'m').subtract(1, 'months').daysInMonth();
            var curm = moment().utc().add(5, 'hours').add(30,'m').subtract(1, 'months').format("MM");
            var xax;
            var arr =[];
            var cx = 0;
            var dsal = 0;
            res.render("admin/gensalarylm",{worker,dates,xax,arr,cx,curm,dsal,daysm,attrea}) ;
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