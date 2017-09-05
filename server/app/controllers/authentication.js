const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user_list");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");

let sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

let credentialsJSON = (token, email, name, firstname, secondname, phone, date) => {
  return {
    token: token,
    email: email,
    name: name,
    firstname: firstname,
    secondname: secondname,
    phone: phone,
    date: date
  };
};

module.exports.register = function(req, res) {
  var user = new User();

  console.log("Credentials obtained, sending message...");

  user.email = req.body.email;
  user.name = req.body.name;
  user.firstname = req.body.firstname;
  user.secondname = req.body.secondname;
  user.phone = req.body.phone;
  user.date = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");

  user.setPassword(req.body.password);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(mailConfig.transport);
  let mailOptions = mailConfig.mailOptions(user.email);

  user.save(function(err) {
    var token;
    token = user.generateJwt();

    transporter.sendMail(mailOptions, mailConfig.sendMail);

    res.status(200);
    res.json(
      credentialsJSON(
        token,
        user.email,
        user.name,
        user.firstname,
        user.secondname,
        user.phone,
        user.date
      )
    );
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
      res.json(
        credentialsJSON(
          token,
          user.email,
          user.name,
          user.firstname,
          user.secondname,
          user.phone,
          user.date
        )
      );
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
