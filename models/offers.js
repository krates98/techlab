var mongoose = require("mongoose");

var offerSchema = new mongoose.Schema({
   offername: String,
   offerurl: String,
   toggle: Boolean,
   priority: Number
});

module.exports = mongoose.model("Offer", offerSchema);