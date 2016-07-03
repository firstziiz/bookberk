// API.js -- POST AND GET
var express = require('express');
var app = express.Router();
var User = require('./model/user');

// Vendor
var celogin = require('connect-ensure-login')
var passport = require('passport');


// # AUTHENTICATE API #
// --------------------

app.post('/api/login', celogin.ensureLoggedOut(),
  passport.authenticate('local', {
    failureRedirect: '/'
  }),
  function(req, res) {
    console.log("Login Success");
    res.redirect('/dashboard');
  });

app.post('/api/register', celogin.ensureLoggedOut(), function(req, res) {
  User.register(new User({
    username: req.body.username,
  }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', {
        account: account,
        info: "Sorry. That '" + account.username + "' already exists. Try again.",
        err: err
      });
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});



module.exports = app;
