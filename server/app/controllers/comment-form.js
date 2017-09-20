var mongoose = require("mongoose");
const Comments = require("../models/comments");
var moment = require('moment');

module.exports.addComment = function(req, res) {
    var now = moment();

    const tempComment = new Object();
    tempComment.body = req.body.body;
    tempComment.creation = now.format('YYYY-MM-DD h:mm:ss');
    tempComment.author = req.body.author;

    Comments.findOne({ pageId: req.body.pageId }, function(error, comments) {
        if (error || comments === null) {
            _comments = new Comments();
            _comments.pageId = req.body.pageId;
            _comments.comment = tempComment;
            _comments.save(function(error) {
                if (error) {
                    res.status(409).json("please, fill in all fields");
                } else {
                    res.status(200).json(tempComment);
                }
            });

        } else {
            Comments.findOne({ pageId: req.body.pageId }).exec(function(err, com) {
                com.comment.push(tempComment);
                com.save(function(err) {
                    if (error) {
                        res.status(409).json("error");
                    } else {
                        res.status(200).json(tempComment);
                    }
                });
            });
        }
    });

}