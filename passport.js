// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var connection = require('./databases.js').connection;
var LocalUser = require('./databases.js').LocalUser;
var validPassword = require('./databases').validPassword;
var generateHash = require('./databases').generateHash;
// console.log(User);
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {

        connection.query("select * from User where email = '" + email + "';",function(err,rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            connection.query("use Dictionary;");
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {
                // use injection to check in mysql to see if a user is login or not.
                query = "select * from User where email='" + email + "';";
                connection.query(query, function(err, rows){
                    console.log(rows);
                // if there are any errors, return the error
                    if (err)
                        return done(err);
                        // check to see if theres already a user with that email
                    if (rows.length > 0) {
                        console.log("user exists");
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = LocalUser;
                        password = generateHash(password);
                        newUser.password = password;
                        newUser.email = email;

                        // save the user
                        query = "insert into User values ('" + email + "','" + password + "');";
                        connection.query(query, function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));

    // =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            connection.query("use Dictionary;");
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            query = "select * from User where email='" + email + "';";
            connection.query(query, function(err, rows){
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!rows.length > 0)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!validPassword(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                console.log("login success");
                var newUser = LocalUser;
                newUser.password = rows[0].password;
                newUser.email = email;
                return done(null, newUser);
            });

        }));


};


