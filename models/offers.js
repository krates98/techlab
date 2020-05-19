var mongoose = require("mongoose");

var offerSchema = new mongoose.Schema({
   offerurl: String
});

module.exports = mongoose.model("Offer", offerSchema);