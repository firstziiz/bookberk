var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  role : { type: String, default: "user" }, // user -> god!
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
