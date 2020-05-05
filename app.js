const   express         = require("express"),
        methodOverride  = require('method-override'),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        Data            = require("./models/data"),
        Email           = require("./models/emails"),
        request         = require("request-promise"),
        app             = express(),
        seedDB          = require("./seeds");
        // ipCheck         = require("./ipcheck");
        

    mongoose.connect('mongodb://localhost:27017/techlab', { useNewUrlParser: true , useUnifiedTopology: true });
    mongoose.set('useFindAndModify', false);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "ejs");
    app.use(methodOverride('_method'));
    
    // seedDB();
    // ipCheck();

    // require request-ip and register it as middleware
    var requestIp = require('request-ip');
    app.use(requestIp.mw())

    //Landing page

    app.get("/",function(req,res){
        var ip = req.clientIp;
        // req.clientIp;
        res.render("landing",{ip});
    });

    // Fetch Data Page
    
    // app.get("/data",function(req,res){
    //     // Get all data from DB
    //     var ip = "204.89.92.153";
    //     Data.find({}, function(err, alldata){
    //     if(err){
    //         console.log(err);
    //     } else {
    //        res.render("data",{usadata:alldata, ip});
    //     }
    //  });
    // });

    app.get("/data",function(req,res){
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
            
    });



    app.get("/data/:id",function(req,res){
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
               res.redirect("/");
           }
        });
     });
     

    app.listen(3000, '127.0.0.1', function(){
    // app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Techlab Server Has Started!");
     });