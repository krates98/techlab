var mongoose = require("mongoose");

var maccSchema = new mongoose.Schema({
   username: String,
   time: String,
   date: String,
   macadd: String,
   ipaddress: String
});

module.exports = mongoose.model("Macval", maccSchema);