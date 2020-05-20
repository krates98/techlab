const   express         = require("express"),
        router          = express.Router(),
        passport        = require("passport"),
        Email           = require("../models/emails"),
        User            = require("../models/user"),
        request         = require("request-promise"),
        nodemailer      = require("nodemailer"),
        xoauth2         = require("xoauth2");

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'kratesrockstar@gmail.com',
                clientId: '660034104687-7cjclvriplqi2k9h5if7u9i7hhj3klts.apps.googleusercontent.com',
                clientSecret: 'VF529KVc5QJuTmMg61d_Lw_9',
                refreshToken: '1//04PnhrnssQFfBCgYIARAAGAQSNwF-L9IrI1FQH6zospQHj75WwyWlGEl-xvYgZJ0r7HBBG5QFSlUODL9g1oIutdvNZF1l3IxZzvo',
                accessToken: 'ya29.a0AfH6SMB-7qIXDe6P69J04yKvjPoMu-PRhKHdPMK7U7nE0eMLRrx3-_G5HqNi0UzMOH8bah5hM0_WjxVu406FjInqmQkpimDO6lyEaR6lvQU00RMsQHirFPNUGoKGHyr_wSckXXQ9PZjDIWh_oIgAu-md4Aet3v5iED0'
            }
        });

var mailOptions = {
    from: 'Kushagra Srivastava <kratesrockstar@gmail.com>',
    to: 'admin@imsuyash.in',
    subject: 'Email Count Low',
    text: 'Please upload more emails its less than 100'
}


//Landing page

router.get("/", isLoggedIn,async function(req,res){
    var emax = await Email.countDocuments(function(err,emaxa){
        return emaxa;
    })

    if(emax<1000){
        transporter.sendMail(mailOptions, function (err, res) {
            if(err){
                console.log(err);
            } else {
                console.log('Email Sent');
            }
        })
    }

    res.render("index");
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