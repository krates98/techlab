const   express         = require("express"),
        app             = express(),
        methodOverride  = require('method-override'),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        Data            = require("./models/data"),
        Email           = require("./models/emails"),
        User            = require("./models/user"),
        ipAdd           = require("./models/ipaddress"),
        request         = require("request-promise"),
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

    // passport configuration
    app.use(require("express-session")({
        secret: "Whisky Cutest Dog",
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        next();
    });

    // require request-ip and register it as middleware
    var requestIp = require('request-ip');
    app.use(requestIp.mw())

    //Landing page

    app.get("/", isLoggedIn, function(req,res){
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

    app.get("/data", isLoggedIn, function(req,res){
        
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

    app.get("/data/:id", isLoggedIn, function(req,res){
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

    app.get("/pages", isLoggedIn, function(req,res){
        res.render("pages");
    });

    // Fetch Admin Page

    app.get("/admin", isLoggedIn, function(req,res){
        res.render("admin");
    });

    //Delete Fetched Data
    app.delete("/data/:id", isLoggedIn,  function(req, res){
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

    // Auth Routes

    // Show Register Form
    app.get("/hiddenregister", function(req,res){
         res.render("register");
     })
    
    // Sign Up Logic

    app.post("/hiddenregister", function(req,res){
        var newUser = new User({username: req.body.username});
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
            res.redirect("/");
            });
        });
    });


    // Show Login Form
    app.get("/login", function(req,res){
        res.render("login");
    })
   
   // Login Logic

   app.post("/login", passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login"    
    }), function(req,res){
        
    });

    // Logout Logic

    app.get("/logout", function(req,res){
        req.logout();
        res.redirect("/login");
    });

    // middleware

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }

    app.listen(3000, '127.0.0.1', function(){
    // app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Techlab Server Has Started!");
     });