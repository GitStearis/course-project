var mongoose = require("mongoose");
var user = require("./user");

var UserSchema = new mongoose.Schema(user.UserModel);
var User = mongoose.model("user_list", UserSchema);

module.exports = {
    User
};