var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
   contactname: String,
   zip: String,
   phone: String,
   address: String,
   state: String
});

module.exports = mongoose.model("Data", dataSchema);