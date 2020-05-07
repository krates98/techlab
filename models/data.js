var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
   firstname:String,
   lastname: String,
   zip: String,
   phone: String,
   address: String,
   state: String,
   city: String,
   gender: String
});

module.exports = mongoose.model("Data", dataSchema);