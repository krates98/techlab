var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema  = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String,
    pin: String,
    laddress: String,
    paddress: String,
    gpay:String,
    phonepe: String,
    paytm: String,
    bankname: String,
    bankacc: String,
    bankbranch: String,
    bankifsc: String,
    bankbene: String
})

UserSchema.plugin(passportLocalMongoose);

module.exports  = mongoose.model("User", UserSchema);

