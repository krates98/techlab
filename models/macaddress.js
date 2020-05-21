var mongoose = require("mongoose");

var macSchema = new mongoose.Schema({
   macaddress: String
});

module.exports = mongoose.model("Mac", macSchema);