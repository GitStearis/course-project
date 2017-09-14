const mongoose = require("mongoose");

mongoose.Promise = Promise;

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    goal: {
        type: Number,
        required: true
    },
    collected: {
        type: Number,
        required: true
    },

    date: {
        type: String, // Date or String ?
        required: true
    },
    creation: {
        type: String, // Date or String ?
        required: true
    },

    tags: [{
        type: String,
        required: true
    }],
    pageId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("project_list", projectSchema);