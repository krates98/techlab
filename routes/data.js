const   express         = require("express"),
        router          = express.Router(),
        Data            = require("../models/data"),
        Email           = require("../models/emails"),
        ipAdd           = require("../models/ipaddress"),
        request         = require("request-promise"),
        middleware      = require("../middleware/"),
        moment          = require('moment');

// Data Pages

router.get("/data", middleware.isLoggedInUser, function(req,res){
    res.render("data/notfound");
})

router.post("/data", middleware.isLoggedInUser, function(req,res){
    
        var ip = req.clientIp;
        // request("http://api.ipstack.com/"+ ip +"?access_key=2b9734f1e27d53cbe77f447111dba11c").then((body) => {
        request("http://ip-api.com/json/"+ ip).then((body) => { 
        const ipData = JSON.parse(body);
        var xar = ipData.region;
        var xac = ipData.regionName;
        var xa = ipData.countryCode;
        
        Data.findOne({state: xa}, function(err, alldata){
            if(err){
                req.flash("error","Database Offline");
                res.redirect("back");
            } else {
            if(alldata){
            var currentIp = req.clientIp;
            var datime    = moment().utc().add(5, 'hours').add(30,'m').format("DD/MM/YYYY");
            var tatime    = moment().utc().add(5, 'hours').add(30,'m').format("LTS");
            var username  = req.user.username;
            var ipcreate  = {ipaddress: currentIp, date: datime, time: tatime, username: username}; 
            ipAdd.create(ipcreate, function(err){
                if(err){
                    console.log("error")
                } else {
                    console.log("iP Added")
                }
            });
            res.render("data",{alldata:alldata,xar,xac,xa});
            
            } else {
            res.render("data/notfound");
            }
            }
        });      
        }).catch(function (err) {
            res.render("data/notfound");
            console.log("Api call failed!!");
            });
    });

    // Data Show Page

    router.get("/data/:id", middleware.isLoggedInUser, async function(req,res){
        res.render("data/notfound")
    });

    router.post("/data/:id", middleware.isLoggedInUser, async function(req,res){

        var oneEmail = await Email.findOne(function(err, emails){
        return emails;
        });
        
        var oneData = await Data.findById(req.params.id, function(err, alldata){ 
                return alldata;
            }); 

            // await Email.findByIdAndRemove(oneEmail.id, function(err){
            //     console.log("delete email");
            //   });

            await Data.findByIdAndRemove(req.params.id, function(err){
                 console.log("delete data");
               });

            var twoEmail = await Email.findOne(function(err, tmails){
            return tmails;
            });
               res.render("data/show",{usadata:oneData, emails: oneEmail , tmails: twoEmail});
            });

            router.post("/data/email/:id", middleware.isLoggedInUser, async function(req,res){

                var oneData = await Email.findById(req.params.id, function(err, alldata){ 
                    return alldata;
                }); 
                
                await Email.findByIdAndRemove(req.params.id, function(err){
                    console.log("delete second email");
                  });
            

                       res.render("data/email",{oneData});
                    });

    //Delete Fetched Data
    router.delete("/data/:id", middleware.isLoggedInUser,  function(req, res){
               res.redirect("/logout");
     });

     module.exports = router;