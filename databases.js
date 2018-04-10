var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:""
});

connection.connect(function(err){
    if (err) {
        console.log("Error Connection to DB" + err);
        return;
    }
    console.log("Connection established...");
});



var LocalUser = {};
const bcrypt = require('bcrypt-nodejs');
generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
validPassword = function(TruePassword, TypeInPassword) {
    return bcrypt.compareSync(TruePassword, TypeInPassword);
};

module.exports = {
    connection: connection,
    LocalUser: LocalUser,
    validPassword: validPassword,
    generateHash: generateHash
};

