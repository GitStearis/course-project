var mongoose = require("mongoose");
var User = require("../models/users");

module.exports.list = function(req, res) {
  User.find({}, function(err, users) {
    if (err || users === null) {
      res.send("{}");
      return;
    }
    // for (user in users) {
    //   users[user].isBlocked = items[item].isBlocked || false;
    // }
    res.send(JSON.stringify(users));
  });
};
