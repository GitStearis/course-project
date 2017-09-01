const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

const model = require('./models/user');

const configDB = require("./config/database.js");

mongoose.connect(configDB.url, {
    useMongoClient: true
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(session({ secret: "ilovescotchscotchyscotchscotch" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    res.header("Content-Type", 'application/json');
    next();
})

// routes ======================================================================
require("./routes/index.js")(app, passport); // load our routes and pass in our app and fully configured passport
const dbModel = require('./routes/database.js');
dbModel(app, model);

// launch ======================================================================
app.listen(port);
console.log("The magic happens on port " + port);

module.exports = app;