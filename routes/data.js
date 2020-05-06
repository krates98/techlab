const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        User            = require("../models/user"),
        ipAdd           = require("../models/ipaddress"),
        request         = require("request-promise");

// Data Pages

router.get("/data", isLoggedIn, function(req,res){
        
    ipAdd.find({}, function(err, ipData, next){
        if(err){
            console.log(err);
        }
        else{
            for(var i=0;i<ipData.length;i++){
            if(req.clientIp === ipData[i].ipaddress){
            return res.render("ipcheck");
            }
          };
        var ip = "204.89.92.153";
        var boolData = false;
        request("http://api.ipstack.com/"+ ip +"?access_key=2b9734f1e27d53cbe77f447111dba11c").then((body) => {
        const ipData = JSON.parse(body);
        var xa = ipData.region_code;
        // Get all data from DB
        Data.find({}, function(err, alldata){
        if(err){
            console.log(err);
        } else {
        res.render("data",{usadata:alldata, ip, xa, boolData});
        }
        });
        }).catch(function (err) {
        console.log("Api call failed!!");
        });

        }
        });
        var currentIp = req.clientIp;
        var datime    = (new Date()).toLocaleDateString('en-GB');
        var tatime    = (new Date()).toLocaleTimeString('en-US');
        var ipcreate  = {ipaddress: currentIp, date: datime, time: tatime} 
        ipAdd.create(ipcreate, function(err, email){
        if(err){
            console.log(err)
        } else {
            console.log("added ip");
                }
        });
    });

    // Data Show Page

router.get("/data/:id", isLoggedIn, function(req,res){
    Email.findOne(function(err, emails){
    
    Data.findById(req.params.id, function(err, alldata){
        if(err){
            console.log(err);
        } else {
           res.render("show",{usadata:alldata, emails: emails});
        }
     });
    });
});

    //Delete Fetched Data
    router.delete("/data/:id", isLoggedIn,  function(req, res){
        Email.findOneAndDelete({},function(err){
            if(err){
                console.log("cannot delete emails")
            }
            else{
                console.log("deleted email")
            }
        });
        Data.findByIdAndRemove(req.params.id, function(err){
           if(err){
               res.redirect("/");
           } else {
               console.log("deleted data")
               res.redirect("/");
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