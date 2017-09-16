var mongoose = require("mongoose");
const News = require("../models/news");

function hash(str) {
    return str.split('').reduce((prevHash, currVal) =>
        ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0) + 2147483647;
}

module.exports.createNews = function(req, res) {
    _news = new News();

    _news.title = req.body.title;
    _news.description = req.body.description;
    _news.body = req.body.body;
    _news.image = req.body.image;
    _news.creation = new Date().toJSON().slice(0, 10);
    _news.tags = req.body.tags;
    _news.author = req.body.author;
    _news.pageId = req.body.pageId;
    _news.newsId = hash(req.body.title + req.body.author);

    News.findOne({ newsId: _news.newsId }, function(err, news) {
        if (news === null) {
            _news.save(function(error) {
                if (error) {
                    res.status(409).json("please, fill in all fields");
                } else {
                    res.status(200).json(_news);
                }
            });
        }
    });
}