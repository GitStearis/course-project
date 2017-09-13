var mongoose = require("mongoose");
const Project = require("../models/projects");

module.exports.projectByPageId = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            res.status(200).json(project);
        }
    });
}