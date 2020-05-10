const   express         = require("express"),
        router          = express.Router(),
        passport        = require("passport"),
        User            = require("../models/user"),
        request         = require("request-promise");

//Landing page

router.get("/", isLoggedIn, function(req,res){
    var ip = req.clientIp;
    request("http://api.ipstack.com/"+ ip +"?access_key=2b9734f1e27d53cbe77f447111dba11c").then((body) => {
        const ipData = JSON.parse(body);
        var xa  = ipData.region_code;
        var xar = ipData.region_name;
        var xac = ipData.country_name;
        
    res.render("index",{ip, xa, xar, xac});

    }).catch(function (err) {
    console.log("Api call failed!!");
    });
});
    // Show Register Form
    router.get("/hiddenregister", function(req,res){
        res.render("register");
    });
   
   // Sign Up Logic

   router.post("/hiddenregister", function(req,res){
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
   router.get("/login", function(req,res){
       res.render("login");
   })
  
  // Login Logic

  router.post("/login", passport.authenticate("local",{
       successRedirect: "/",
       failureRedirect: "/login"    
   }), function(req,res){
       
   });

   // Logout Logic

   router.get("/logout", function(req,res){
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

module.exports = router;