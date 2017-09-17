var mongoose = require("mongoose");
var News = require("../models/news");


module.exports.news = function(req, res) {
    News.find({}, function(err, news) {
        if (err || news === null) {
            res.status(404);
            return;
        }
        res.send(JSON.stringify(news));
    });
}

module.exports.newsRecent = function(req, res) {
    var query = News.find().sort({ $natural: -1 }).limit(6);
    query.exec(function(err, news) {
        if (err || news === null) {
            res.status(404);
            return;
        } else {
            res.send(JSON.stringify(news));
        }
    });
}

module.exports.newsRecentByPageId = function(req, res) {
    var query = News.find({ pageId: req.params.pageId }).sort({ $natural: -1 }).limit(3);
    query.exec(function(err, news) {
        if (err || news === null) {
            res.status(404);
            return;
        } else {
            res.send(JSON.stringify(news));
        }
    });
}

module.exports.newsByPageId = function(req, res) {
    var query = News.find({ pageId: req.params.pageId }).sort({ $natural: -1 });
    query.exec(function(err, news) {
        if (err || news === null) {
            res.status(404);
            return;
        } else {
            res.send(JSON.stringify(news));
        }
    });
}

module.exports.newsByNewsId = function(req, res) {
    News.find({ newsId: req.params.newsId }, function(err, news) {
        if (err || news === null) {
            res.status(404);
            return;
        } else {
            res.status(200).json(news);
        }
    });
}