const   express         = require("express"),
        router          = express.Router(),
        ipAdd           = require("../models/ipaddress"),
        User            = require("../models/user"),
        createCsvWriter = require('csv-writer').createObjectCsvWriter,
        csvWriter = createCsvWriter({
        path: '/Users/krates/myapps/techlab/file.csv',
        header: [
                    {id: 'date', title: 'DATE'},
                    {id: 'username', title: 'USERNAME'},
                    {id: 'ipaddress', title: 'IPADDRESS'},
                    {id: 'time', title: 'TIME'}
                ]
                });

        router.get("/admin", isLoggedIn, function(req,res){
            var usher = req.user.username;
                if(usher === "krates"){
                    ipAdd.find(function(err,ipad){
                        if(err){
                            console.log(err);
                        }
                        else{
                            const records = ipad;
                            csvWriter.writeRecords(records)
                            .then(() => {
                                console.log('...Done');
                            });
                            res.render("admin",{ipad:ipad});
                            }
                    });
                }
                else{
                    res.send("Not Authorised");
                }
        });

        // middleware

        function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
       res.redirect("/login");
        }

        module.exports = router;