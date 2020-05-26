var mongoose = require("mongoose");

var offerSchema = new mongoose.Schema({
   offername: String,
   offerurl: String
});

module.exports = mongoose.model("Offer", offerSchema);