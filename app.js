const   express         = require("express"),
        methodOverride  = require('method-override'),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        Data            = require("./models/data"),
        request         = require("request-promise"),
        app             = express(),
        seedDB          = require("./seeds");

    mongoose.connect('mongodb://localhost:27017/techlab', { useNewUrlParser: true , useUnifiedTopology: true });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "ejs");
    app.use(methodOverride('_method'));
    // seedDB();

    // require request-ip and register it as middleware
    var requestIp = require('request-ip');
    app.use(requestIp.mw())

    //Landing page

    app.get("/",function(req,res){
        var ip = req.clientIp;
        res.render("landing",{ip});
    });

    // Fetch Data Page

    app.get("/data",function(req,res){
        // Get all campgrounds from DB
        Data.find({}, function(err, alldata){
        if(err){
            console.log(err);
        } else {
           res.render("data",{usadata:alldata});
        }
     });
    });

    app.get("/data/:id",function(req,res){
        Data.findById(req.params.id, function(err, alldata){
            if(err){
                console.log(err);
            } else {
               res.render("show",{usadata:alldata});
            }
         });
    });

    // Fetch Offer Pages

    app.get("/pages",function(req,res){
        res.render("pages");
    });

    // Fetch Admin Page

    app.get("/admin",function(req,res){
        res.render("admin");
    });

    //Delete Fetched Data
    app.delete("/data/:id", function(req, res){
        // Campground.findByIdAndRemove(req.params.id, function(err){
        //    if(err){
        //        res.redirect("/");
        //    } else {
        //        res.redirect("/");
        //    }
        // });
        res.send("you are trying to delete something");
     });
         //Delete Fetched Data
    app.put("/data/:id", function(req, res){
        // Campground.findByIdAndRemove(req.params.id, function(err){
        //    if(err){
        //        res.redirect("/");
        //    } else {
        //        res.redirect("/");
        //    }
        // });
        res.send("you are trying to put something");
     });

    app.listen(3000, '127.0.0.1', function(){
    // app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Techlab Server Has Started!");
     });