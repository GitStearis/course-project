const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
require("./services/mongoose");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    res.header("Content-Type", 'application/json');
    next();
})

require('./app/routes')(app, {});

const port = 3000;

app.listen(port, function() {
    console.log('Server is active on ' + port);
});