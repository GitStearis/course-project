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

module.exports.deleteSelected = function(req, res) {
    console.log(req.body);
    let arr = req.body;
    arr.map(user => {
        User.remove({email: user}, function(err, user) {
            if (err || user === null) {
                res.status(404);
                res.send("User is not found");
                return;
            }
        });
        res.status(200);
        res.send("Users are deleted");
    });
};

module.exports.blockSelected = function(req, res) {
    console.log(req.body);
    let arr = req.body;
    arr.map(user => {
        User.findOne({email: user}, function(err, user) {
            if (err || user === null) {
                res.send("User is not found");
                return;
            }
        
            user.isBlocked = true;
            user.save();
        });
    });
    res.status(200);
    res.send("Users are blocked");
}

module.exports.unblockSelected = function(req, res) {
    console.log(req.body);
    let arr = req.body;
    arr.map(user => {
        User.findOne({email: user}, function(err, user) {
            if (err || user === null) {
                res.send("User is not found");
                return;
            }
        
            user.isBlocked = false;
            user.save();
        });
    });
    res.status(200);
    res.send("Users are unblocked");
}

//not in use
module.exports.confirmSelected = function(req, res) {
    console.log(req.body);
    let arr = req.body;
    arr.map( user => {
        User.findOne({email: user}, function(err, user) {
            if (err || user === null) {
                res.send("User is not found");
                return;
            }

            user.permission = "checked";
            user.save();
        });
    });
    res.status(200);
    res.send("Users are checked");
}

module.exports.passportUser = function(req, res) {
    User.findOne({email: req.param.user}, function(err, user) {
        if (err || user === null) {
            res.send("User is not found");
            return;
        }

        if (user.passport !== null) {
            res.json(user.passport);
        }
    });
}

// already in use
module.exports.confirmUser = function(req, res) {
    User.findOne({email: req.body.user}, function(err, user) {
        if (err || user === null) {
            res.send("User is not found");
            return;
        }

        user.permission = "checked";
        user.save();
    });
}