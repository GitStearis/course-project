const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user_list");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");

let sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

let credentialsJSON = (
  token,
  email,
  name,
  firstname,
  secondname,
  phone,
  date
) => {
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

let rand, host;
let _user;

module.exports.register = function(req, res) {
  _user = new User();

  console.log("Credentials obtained, sending verification message...");

  _user.email = req.body.email;
  _user.name = req.body.name;
  _user.firstname = req.body.firstname;
  _user.secondname = req.body.secondname;
  _user.phone = req.body.phone;
  _user.date = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");
  _user.setPassword(req.body.password);

  host = req.get("host");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(mailConfig.transport);
  rand = mailConfig.verificationRand();
  let mailOptions = mailConfig.verificationMail(_user.email, rand, req);
  transporter.sendMail(mailOptions, mailConfig.sendMail);
  console.log('Verification mail was delivered.');
};

module.exports.verification = function(req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") === "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");

      _user.save(function(err) {
        var token;
        token = _user.generateJwt();
        res.status(200);
        res.json(
          credentialsJSON(
            token,
            _user.email,
            _user.name,
            _user.firstname,
            _user.secondname,
            _user.phone,
            _user.date
          )
        );
      });
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
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
