var mongoose = require("mongoose");
var Comments = require("../models/comments");

module.exports.commentsByPageId = function(req, res) {
    Comments.findOne({ pageId: req.params.pageId }, function(err, comments) {
        if (err || comments === null) {
            res.status(404).json(err);
        } else {
            res.status(200).json(comments.comment);
        }
    });
}