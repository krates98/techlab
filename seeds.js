var mongoose = require("mongoose");
var Data     = require("./models/data");
var request  = require("request-promise");

var usdata = [];

function seedDB(){  //single braces

            request("http://www.exirv.com/1.json")
            .then((body) => { //double braces
            const parsedData = JSON.parse(body);
            for(var i=0;i<parsedData.length;i++){
             usdata.push(parsedData[i]);
            };  
        //Remove all data
        //    Data.deleteMany({}, function(err){
                // if(err){
                //     console.log(err);
                // }
                // console.log("removed data!");
                //  add a few data
                // console.log(usdata[0]);
                    usdata.forEach(function(seed){
                    Data.create(seed, function(err, data){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added data");
                            
                        }
                    });
                });
            }).catch(function (err) {
        console.log("Api call failed!!");
        });
        };

module.exports = seedDB;
