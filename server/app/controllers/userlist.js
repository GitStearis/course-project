var mongoose = require("mongoose");
var User = require("../models/users");

module.exports.list = function(req, res) {
    User.find({}, function(err, users) {
        if (err || users === null) {
            res.status(404);
            return;
        }
        res.send(JSON.stringify(users));
    });
};