const mongoose = require("mongoose");
let gracefulShutdown;
const dbURI = "mongodb://root:root@ds119524.mlab.com:19524/course-project";

mongoose.connect(dbURI, {
  useMongoClient: true
});

mongoose.Promise = Promise;  

// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

