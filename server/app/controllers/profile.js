var mongoose = require("mongoose");
var User = require("../models/users");

module.exports.profileRead = function(req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            message: "UnauthorizedError: private profile"
        });
    } else {
        User.findById(req.payload._id).exec(function(err, user) {
            res.status(200).json(user);
        });
    }
};

module.exports.profileByUsername = function(req, res) {
    User.findOne({ name: req.params.username }, function(err, user) {
        if (err || user === null) {
            res.status(404).json(err);
        } else {
            res.status(200).json(user);
        }
    });
}