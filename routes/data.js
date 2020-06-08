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
        var currentIp = req.clientIp;
        var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
        var tatime    = moment().utc().add(5, 'hours').add(30,'m').format("LTS");
        var username  = req.user.username;
        var ipcreate  = {ipaddress: currentIp, date: datime, time: tatime, username: username}; 
        ipAdd.create(ipcreate, function(err, email){
            if(err && err.code !== 11000) {
                console.log("iP Added")
                } else {
                console.log("Duplicate Ip Exist")
                }
            });
        var ip = req.clientIp;
        var boolData = false;
        request("http://api.ipstack.com/"+ ip +"?access_key=2b9734f1e27d53cbe77f447111dba11c").then((body) => {
        const ipData = JSON.parse(body);
        var xar = ipData.region_name;
        var xac = ipData.country_name;
        var xa = ipData.region_code;
        // Get all data from DB
        Data.findOne({state: xa}, function(err, alldata){
            if(err){
                console.log(err);
            } else {
            res.render("data",{alldata:alldata,xar,xac,xa});
            }
        });
        }).catch(function (err) {
            res.render("data/notfound");
            console.log("Api call failed!!");
            });
        
    });

    // Data Show Page

router.get("/data/:id", isLoggedIn, async function(req,res){
        var currentIp = req.clientIp;
        var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
        var tatime    = moment().utc().add(5, 'hours').add(30,'m').format("LTS");
        var username  = req.user.username;
        var ipcreate  = {ipaddress: currentIp, date: datime, time: tatime, username: username}; 
        ipAdd.create(ipcreate, function(err, email){
        if(err && err.code !== 11000) {
            console.log("iP Added")
            } else {
            console.log("Duplicate Ip Exist")
            }
        });
        

        var oneEmail = await Email.findOne(function(err, emails){
        return emails;
        });
        
        var oneData = await Data.findById(req.params.id, function(err, alldata){ 
                return alldata;
            }); 

        await Email.findOneAndDelete({}, function(err){
                    console.log("deleted email")
            });
        await Data.findByIdAndRemove(req.params.id, function(err){
                 console.log("delete data");
               });
               res.render("data/show",{usadata:oneData, emails: oneEmail});
            });

    //Delete Fetched Data
    router.delete("/data/:id", isLoggedIn,  function(req, res){
               res.redirect("/logout");
     });

     // middleware

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

     module.exports = router;