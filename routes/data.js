const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        User            = require("../models/user"),
        ipAdd           = require("../models/ipaddress"),
        request         = require("request-promise"),
        moment          = require('moment');

// Data Pages

router.get("/data", isLoggedIn, function(req,res){
        
    ipAdd.find({}, function(err, ipData){
        if(err){
            console.log(err);
        }
        else{
            
            for(var i=0;i<ipData.length;i++){
            if(req.clientIp === ipData[i].ipaddress){
            return res.render("data/ipcheck");
            }
          }
        
    
        var ip = req.clientIp;
        var boolData = false;
        request("http://api.ipstack.com/"+ ip +"?access_key=2b9734f1e27d53cbe77f447111dba11c").then((body) => {
        const ipData = JSON.parse(body);
        var xa = ipData.region_code;
        // Get all data from DB
        Data.findOne({state: xa}, function(err, alldata){
            if(err){
                console.log(err);
            } else {
            res.render("data",{alldata:alldata});
            }
        });
        }).catch(function (err) {
            console.log("Api call failed!!");
            });
        }
    });
});

    // Data Show Page

router.get("/data/:id", isLoggedIn, function(req,res){
        var currentIp = req.clientIp;
        var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
        var tatime    = moment().utc().add(5, 'hours').add(30,'m').format("LTS");
        var userId    = req.user._id;
        var username  = req.user.username;
        var ipcreate  = {ipaddress: currentIp, date: datime, time: tatime, username: username} 
        ipAdd.create(ipcreate, function(err, email){
        if(err){
            console.log(err)
            } 
        });
    Email.findOne(function(err, emails){
    
    Data.findById(req.params.id, function(err, alldata){
        if(err){
            console.log(err);
        } else {
           res.render("data/show",{usadata:alldata, emails: emails});
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
               res.redirect("/logout");
           } else {
               console.log("deleted data")
               res.redirect("/logout");
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