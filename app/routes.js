// ROUTES.js -- RENDER PAGE
var express = require('express');
var app = express.Router();
var user = require('./model/user');

// Vendor
var celogin = require('connect-ensure-login')
var request = require('request');
var cheerio = require('cheerio');

// -----------------
//  R O U T I N G !
// -----------------

app.get('/', celogin.ensureLoggedOut('/dashboard'), function(req, res) {
  res.render('user/login');
});

// # LONGIN / LOGOUT #
// -------------------

app.get('/register', celogin.ensureLoggedOut('/dashboard'), function(req, res) {
  res.render('user/register');
});

app.get('/logout', celogin.ensureLoggedIn(), function(req, res) {
  console.log("Logout Success");
  req.logout();
  res.redirect('/');
});

// # DASHBOARD #
// -------------

app.get('/dashboard/', celogin.ensureLoggedIn('/'), function(req, res) {
  var content = {
    user: req.user,
  };
  res.render('dashboard/index', content);
});

module.exports = app;
