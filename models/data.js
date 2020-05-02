var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
   name: String,
   pincode: String,
   phone: String,
   address: String,
   city: String
});

module.exports = mongoose.model("Data", dataSchema);