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
module.exports.projectsByUsername = function(req, res) {
    Project.find({ author: req.params.username }, function(err, project) {
        if (err || project === null) {
            res.status(404);
            return;
        }
        res.send(JSON.stringify(project));
    });
}

module.exports.projects = function(req, res) {
    Project.find({}, function(err, project) {
        if (err || project === null) {
            res.status(404);
            return;
        }
        res.send(JSON.stringify(project));
    });
}

module.exports.closeProject = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            project.status = "closed";
            res.status(200).json(project);
        }
    });
}

module.exports.projectMarkClosed = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            project.status = "closed";
            res.status(200).json(project);
        }
    });
}

module.exports.projectMarkDone = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            project.status = "done";
            res.status(200).json(project);
        }
    });
}