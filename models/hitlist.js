var mongoose = require("mongoose");

var hitlistSchema = new mongoose.Schema({
   username: String,
   hitip: String,
   date: String,
   time: String,
   uploaddate: String,
   offername: String
});

module.exports = mongoose.model("Hitlist", hitlistSchema);