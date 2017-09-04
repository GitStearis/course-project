const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

mongoose.Promise = Promise;

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1, 64, "sha512").toString("hex");
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1, 64, "sha512").toString("hex");
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
            _id: this._id,
            email: this.email,
            name: this.name,
            firstname: this.firstname,
            secondname: this.secondname,
            phone: this.phone,
            date: this.date,
            exp: parseInt(expiry.getTime() / 1000)
        },
        "MY_SECRET"
    ); // СЕКРЕТ НЕ ДОЛЖЕН ТУТ ХРАНИТЬСЯ! (Но пока так).
};

module.exports = mongoose.model("user_list", userSchema);