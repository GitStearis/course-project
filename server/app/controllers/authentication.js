// const express = require("express");
// const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user_list");
const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail");
const Users = require("../models/users");

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
    date,
    isBlocked,
    permission
) => {
    return {
        token: token,
        email: email,
        name: name,
        firstname: firstname,
        secondname: secondname,
        phone: phone,
        date: date,
        isBlocked: isBlocked,
        permission: permission
    };
};

let verificationToken, host, _user;

function sendVerificationMail(email, req) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(mailConfig.transport);
    verificationToken = mailConfig.verificationToken();
    let mailOptions = mailConfig.verificationMail(email, verificationToken, req);
    transporter.sendMail(mailOptions, mailConfig.sendMail);
    console.log('Verification mail was delivered.');
}

module.exports.register = function(req, res) {
    Users.findOne({ email: req.body.email }, function(err, user) {
        if (user) {
            res.status(409).json("email address is already taken");
        } else {
            Users.findOne({ name: req.body.name }, function(err, user) {
                if (user) {
                    res.status(409).json("username is already taken");
                } else {
                    _user = new User();
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
                    _user.isBlocked = false;
                    _user.permission = "authorized";
                    _user.tipped = 0;
                    _user.ratedProjects = [];
                    _user.followedProjects = [];

                    host = req.get("host");
                    sendVerificationMail(_user.email, req);
                }
            });
        }

    });
};

module.exports.verification = function(req, res) {
    console.log(req.protocol + ":/" + req.get("host"));
    if (req.protocol + "://" + req.get("host") === "http://" + host) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == verificationToken) {
            console.log("Email is verified");

            _user.save(function(err) {
                let token;
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
                        _user.date,
                        _user.isBlocked,
                        _user.permission,
                        _user.tipped
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
                    user.date,
                    user.isBlocked,
                    user.permission,
                    user.tipped
                )
            );
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.requestForCheck = function(req, res) {
    let image = req.body.image;
    Users.findOne({ email: req.body.person }, function(err, user) {
        if (err || user === null) {
            res.send("User is not found")
        }

        user.permission = "pending";
        user.passport = image;
        user.save();

        res.status(200);
        res.send("User is waiting for admin checking now");
    })

}