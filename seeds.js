var mongoose = require("mongoose");
var Data     = require("./models/data");
var request  = require("request-promise");

var usdata = [
    {
        name: "Kushagra Srivastava", 
        pincode: "10001",
        phone: "9899988001",
        address: "18/193 ram narayan bazaar",
        city: "Kanpur"
    },
    {
        name: "Suyash Jain", 
        pincode: "208001",
        phone: "8826111880",
        address: "Patkapur Kanpur",
        city: "Allahabad"
    },
    {
        name: "Mukesh Ambani", 
        pincode: "13223",
        phone: "7483653854",
        address: "Mumbai mei sabse badi jagah",
        city: "Bombay"
    }
]

function seedDB(){
      
   //Remove all data
   Data.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed data!");
         //add a few data
        usdata.forEach(function(seed){
            Data.create(seed, function(err, data){
                if(err){
                    console.log(err)
                } else {
                    console.log("added data");
                    
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
