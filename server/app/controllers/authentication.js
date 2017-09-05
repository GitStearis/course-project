const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user_list");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");

module.exports.register = function(req, res) {
  var user = new User();

  console.log("Credentials obtained, sending message...");

  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(mailConfig.transport);
  let mailOptions = mailConfig.mailOptions(user.email);

  user.save(function(err) {
    var token;
    token = user.generateJwt();

    transporter.sendMail(mailOptions, mailConfig.sendMail);

    res.status(200);
    res.json({
      token: token
    });
  });
};

module.exports.login = function(req, res) {
  passport.authenticate("local", function(err, user, info) {
    let token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
