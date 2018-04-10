var express = require('express');
var app = express();
var fs = require('fs');
var jade = require('jade');
// var engines = require('consolidate');
var JSONStream = require('JSONStream');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var path  = require('path');
var passport = require('passport');
// var User = require('./db').User;
// var FavouriteCountry = require('./db').FavouriteCountry;

var flash    = require('connect-flash');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var LocalStrategy = require('passport-local').Strategy;

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


function defaultContentTypeMiddleware (req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
}

app.set('view engine', 'jade');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));


var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./databases.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(defaultContentTypeMiddleware);
app.use(bodyParser()); // get information from view forms


// required for passport
app.use(session({ secret: 'Laji' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

var server = app.listen(3000, function () {
    console.log('Server running at http://localhost:' + server.address().port);
});

