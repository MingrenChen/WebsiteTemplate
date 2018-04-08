var uri = "mongodb://root:6966xx511@ds237669.mlab.com:37669/dictionary";

var mongoose = require('mongoose');

mongoose.connect(uri);

var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('db connected');
});


var userSchema = mongoose.Schema({
    username: String,
    local            : {
        email        : String,
        password     : String
    },
    wordbook: [String],
    review: [String]
});



userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};







var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};

