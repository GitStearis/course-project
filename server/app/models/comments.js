const mongoose = require("mongoose");

mongoose.Promise = Promise;

var projectSchema = new mongoose.Schema({
    pageId: {
        type: String,
        required: true
    },
    comment: [{
        body: {
            type: String,
            required: true
        },
        creation: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("comment_list", projectSchema);