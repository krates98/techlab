var express = require("express"),
    app     = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

    // mongoose.connect('mongodb://localhost:27017/techlab', { useNewUrlParser: true , useUnifiedTopology: true });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "ejs");

    // require request-ip and register it as middleware
var requestIp = require('request-ip');
    app.use(requestIp.mw())

    //iframe page

    app.get("/",function(req,res){
        var ip = req.clientIp;
        res.render("landing",{ip});
    });

    app.get("/",function(req,res){
        var ip = req.clientIp;
        res.render("landing",{ip});
    });

    app.get("/",function(req,res){
        res.render("landing",{ip});
    });

    // Middleware

    app.get("ipcheck",function(req,res){
        res.render("ipcheck");
    });

    app.listen(3000, '127.0.0.1', function(){
        console.log("The YelpCamp Server Has Started!");
     });