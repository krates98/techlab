const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        Data            = require("./models/data"),
        request         = require("request-promise"),
        seedDB          = require("./seeds");

    mongoose.connect('mongodb://localhost:27017/techlab', { useNewUrlParser: true , useUnifiedTopology: true });
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
    app.set("view engine", "ejs");
    // seedDB();

    // require request-ip and register it as middleware
    var requestIp = require('request-ip');
    app.use(requestIp.mw())

    //Landing page

    app.get("/",function(req,res){
        var ip = req.clientIp;
        res.render("landing",{ip});
    });

    //Delete first element of data array
    app.post("/", function(req, res){
        // usadata.shift();
        // res.redirect("/");
        res.send("You hit the post route")
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

    // Fetch Offer Pages

    app.get("/pages",function(req,res){
        res.render("pages");
    });

    // Fetch Offer Pages

    app.get("/admin",function(req,res){
        res.render("admin");
    });

    // Middleware

    app.get("/ipcheck",function(req,res){
        // var url = 'https://api.covid19india.org/data.json';
        // request(url , function(error, response, body){
        // if(!error && response.statusCode == 200){
        // var parsedData = JSON.parse(body);
        // res.send("${parsedData.cases_time_series}");
        // }
    request("http://www.exirv.com/1.json")
    .then((body) => {
    const parsedData = JSON.parse(body);
	res.render("ipcheck", {parsedData:parsedData});
    })
    .catch(function (err) {
       console.log("Api call failed!!");
    });
   
    });


    app.listen(3000, '127.0.0.1', function(){
    // app.listen(process.env.PORT, process.env.IP, function(){
        console.log("Techlab Server Has Started!");
     });