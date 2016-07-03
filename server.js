// -- Includer --
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var path = require('path');

// -- Configuration --
var app = express();

// -- Setup Database --
mongoose.connect('mongodb://127.0.0.1/Bookberk'); // You can change url to your database.

// -- Setup User --
var User = require('./app/model/user');
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -- Set Port --
app.set('port', process.env.PORT || 3000);

// -- Setup 'jade' --
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// -- Setup 'public path' --
app.use(express.static(__dirname + '/public'));

// -- Setup Other --
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 3600000
  },
  rolling: true,
  resave: true,
  saveUninitialized: false
})); // 1 day

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// -- Routing --
var routes = require('./app/routes');
var api = require('./app/api');

app.use('/', routes);
app.use('/', api);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/// error handlers
// -- dev mode --
app.use(morgan('dev'));

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;
