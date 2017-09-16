var mongoose = require("mongoose");
var News = require("../models/news");

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