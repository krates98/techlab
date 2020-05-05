var mongoose = require("mongoose");

var ipSchema = new mongoose.Schema({
   ipaddress: String,
   date: String,
   time: String
});

module.exports = mongoose.model("ipAddress", ipSchema);