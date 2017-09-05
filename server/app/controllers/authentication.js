const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user_list");

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
  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  var user = new User();

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
  user.save(function(err) {
    var token;
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
  });
};

module.exports.login = function(req, res) {
  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

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
