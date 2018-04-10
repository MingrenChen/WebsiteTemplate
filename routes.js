var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
function jsonParse() {
    var parse = bodyParser.json();
    return function (req, res, next) {
        req.headers['content-type'] = 'application/json';
        parse(req, res, next)
    }
}


module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        if (req.isAuthenticated()) {
            user = req.user;
        }
        else
            user = null;

        res.render('index.jade', {
            user : req.user // get the user out of session and pass to template
        }); // load the index.ejs file
    });

    app.get('/index', function(req, res) {
        res.redirect('/');
    });


    app.get('/login', notLoggedIn, function(req, res) {
        res.render('login.jade', { message: req.flash('loginMessage') });
    });

    app.get('/signup', notLoggedIn, function (req, res) {
        res.render('signup.jade', { message: req.flash('signupMessage') })
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup',
        passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash message
        })
    );

};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// route middleware to make sure a user is logged in
function notLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (!req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


