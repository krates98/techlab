const   express         = require("express"),
        Fixed           = require("../models/fixedcost"),
        Earning         = require("../models/earning"),
        ipAdd           = require("../models/ipaddress"),
        User            = require("../models/user"),
        Att             = require("../models/attendance"),
        moment          = require("moment"),
        router          = express.Router();
    
    // Fetch Account Page

    router.get("/accounts", isLoggedIn ,async function(req,res){
        const cost = await Fixed.find(function(ting){
            return ting;
        })
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
            
        let costing = (cost[0].rent + cost[0].officeboy + cost[0].guard + cost[0].generator + cost[0].maid + cost[0].elecfix + cost[0].elecran + cost[0].diesel + cost[0].tead + cost[0].tean + cost[0].dsl + cost[0].emails + cost[0].fkref + cost[0].traffic + cost[0].hosting + cost[0].domains + cost[0].misl)
        res.render("accounts/index", {cost,costing,worker,dates,xax,arr,cx,daysd,curm,dsal,daysm,attrea});
    });

    // Fetch Account Fixed Cost Page

    router.get("/accounts/fixedcost", isLoggedIn ,async function(req,res){
        const cost = await Fixed.find(function(ting){
            return ting;
        })
        
        res.render("accounts/fixedcost",{cost});
    });

    // Post Account Fixed Cost Page

    router.post("/accounts/fixedcost", isLoggedIn ,async function(req,res){
        const cost = await Fixed.find(function(ting){
            return ting;
        })
        Fixed.findOneAndUpdate(cost, req.body, function(err,updateduser){});
        res.redirect("fixedcost");
    });

    // Fetch Account Earning

    router.get("/accounts/earning", isLoggedIn ,async function(req,res){
        const cost = await Earning.find(function(ting){
            return ting;
        })
        
        res.render("accounts/earning",{cost});
    });

    // Post Account Earning

    router.post("/accounts/earning", isLoggedIn ,async function(req,res){
        const cost = await Earning.find(function(ting){
            return ting;
        })
        Earning.findOneAndUpdate(cost, req.body, function(err,updateduser){});
        res.redirect("earning");
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