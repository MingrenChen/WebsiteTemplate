var User    = require('./databases.js').User;

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

        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
        }); // load the index.ejs file
    });

    app.get('/index', function(req, res) {
        res.redirect('/');
    });


    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') })
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.get('/profile', isLoggedIn, function(req, res) {
        Profile.findOne({email : req.user.local.email})
            .then(function(doc){
                console.log(doc);
                res.render('profile.ejs',
                    {user: req.user,
                        profile: doc
                    })
            })
    });

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




    app.post('/search', function(req, res){
        res.render("search.ejs");
    });

    app.post('/addcountry', function(req, res){
        new Profile({
            email: req.user.local.email,
            major: req.body.major,
            StudentID : req.body.StudentID,
            country : req.body.country,
            name : req.body.name
        }).save(function(err, doc){
            if(err) {
                res.redirect('/profile');
            }

            else res.redirect('/profile')

        })
    })

//     app.post('/deleteC/', function(req, res){
//         FavouriteCountry.findOneAndRemove({ uID: req.user.local.email, countryID: req.body.countryD}, function(err) {
//           if (err) throw err;
//         });
//         res.redirect('/profile');
//     })

//     app.post('/editC/', function(req, res){
//         FavouriteCountry.findOne({uID: req.user.local.email, countryID: req.body.countryE})
//             .then(function(doc){
//                 doc.comment= req.body.commentE;
//                 doc.rate =req.body.ratingE;
//                 doc.save();

//         })
//         res.redirect('/profile');
//     })


//     //TODO AJAX CALLLSZZZZ

//     app.get('/RESTCOUNTRY/:country', function(req, res) {
//         var country = req.params.country;
//         console.log(country);
//        request.get({ url: "https://restcountries.eu/rest/v2/name/" + country},      function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log('IN SERVER');

//                 // console.log(body);
//                 res.send(body).status(200);
//             }
//             else res.send(error);
//         });

//     });

//     app.get('/ALLRESTCOUNTRY', function(req, res) {
//         request.get({ url: "https://restcountries.eu/rest/v2/all"},      function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log('IN SERVER');

//                 // console.log(body);
//                 res.send(body).status(200);
//             }
//             else res.send(error);
//         });

//     });

//     app.get('/EXCHANGE/:Ecode', function(req, res) {
//         var Ec = req.params.Ecode;
//         request.get({ url: 'http://api.fixer.io/latest?base=' + Ec},      function(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log('IN SERVER');

//                 // console.log(body);
//                 res.send(body).status(200);
//             }
//             else res.send(error);
//         });

//     });



//     //TODO handle messages
//     // app.get('/api/messages', function(req, res) {
//     //     Messages.find({}, function (err, messages) {
//     //         res.json(messages).status(200);
//     //     });
//     // });


//     app.get('/api/messages', function(req, res) {
//         Messages.find({}, function (err, messages) {
//             var mess = {};

//             messages.forEach(function(message) {
//                 mess[message._id] = message;
//             });
//             res.json(mess).status(200);
//         });
//     });

//     var jsonParser = jsonParse()
//     app.post('/api/messages',function(req, res) {
//         // req.headers['content-type'] = 'application/json';
//         // console.log(JSON.parse(req.body));
//         console.log(req.headers['content-type']);
//         var app = req.body.data;

//         if (req.headers['content-type'] !== 'application/json') {
//             for (key in req.body) {
//                 app =JSON.parse(key).data;
//             }
//         }
//         console.log('app    ===', app);
//         var mes = new Messages({message : app});

//         mes.save(function (err, saved) {
//             if (err) throw err;
//             res.status(200).json({
//                 message: saved
//             })

//         })

//     });

//     app.delete('/api/messages/:num', function(req, res) {
//         var idd = req.params.num;

//         Messages.findByIdAndRemove(idd, function(err, todo) {
//             // We'll create a simple object to send back with a message and the id of the document that was removed
//             // You can really do this however you want, though.



//             if (!todo) {
//                 return res.status(404).json({success: false, msg: 'message not found'});
//             }

//             else if (!err) {
//                 var response = {
//                     message: "Todo successfully deleted",
//                     id: todo._id
//                 };
//             }

//             else {
//                 var response = {
//                     message: "ID IS WRONG, PLEASE ENTER THE CORRECT ID",

//                 };
//             }
//             res.status(200).send(response);


//         });
//     });

//     app.delete('/api/allmessages', function(req, res) {
//         Messages.remove({}, function(err) {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     res.status(200).send('success');
//                 }
//             }
//         );
//     });



};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


