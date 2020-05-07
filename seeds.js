var mongoose = require("mongoose");
var Data     = require("./models/data");
var Email     = require("./models/emails");
var request  = require("request-promise");

var usdata = [];
var email = [];

function seedDB(){  //single braces

                // Remove all data
                // Data.deleteMany({}, function(err){
                // if(err){
                //     console.log(err);
                // }
                // else{
                //     console.log("delete data");
                // }
                // });
                // Email.deleteMany({}, function(err){
                //     if(err){
                //         console.log(err);
                //     }
                //     else{
                //         console.log("delete emails");
                //     }
                //     });
                // console.log("removed data!");
                //  add a few data
                // console.log(usdata[0]);

            // request("http://www.exirv.com/data/data1.json")
            // .then((body) => { //double braces
            // const parsedData = JSON.parse(body);
            // for(var i=0;i<parsedData.length;i++){
            //  usdata.push(parsedData[i]);
            // };  
        
            //         usdata.forEach(function(seed){
            //         Data.create(seed, function(err, data){
            //             if(err){
            //                 console.log(err)
            //             } else {
            //                 console.log("added data");
            //                     }
            //         });
            //     });
            // }).catch(function (err) {
            //     console.log("Api call failed!!");
            //     });

            request("http://www.exirv.com/data/email1.json")
            .then((body) => { //double braces
            const parsData = JSON.parse(body);
            for(var i=0;i<parsData.length;i++){
                email.push(parsData[i]);
            };  
        
                    email.forEach(function(bean){
                    Email.create(bean, function(err, email){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added email");
                                }
                                });
                            });
                            }).catch(function (err) {
                            console.log("Email Api call failed!!");
                                    });
} 

module.exports = seedDB;
