const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");

//The default name for the property is user,
// but this is the name of an instance of our Mongoose User model,
// so we’ll set it to payload to avoid confusion.
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

const ctrlProfile = require("../controllers/profile");
const ctrlAuth = require("../controllers/authentication");

// профиль
router.get("/profile", auth, ctrlProfile.profileRead);

// аутентификация
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

module.exports = router;
