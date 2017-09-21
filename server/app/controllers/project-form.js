const mongoose = require("mongoose");
const Project = require("../models/projects");
// const tag = require("../models/tag");

String.prototype.cleanup = function() {

    return this.toLowerCase().replace(/[^\w\s]/gi, '').replace(/[^a-z0-9]+/g, "-");
}

module.exports.createProject = function(req, res) {
    _project = new Project();

    _project.title = req.body.title;
    _project.description = req.body.description;
    _project.body = req.body.body;
    _project.image = req.body.image;
    _project.goal = req.body.goal;
    _project.collected = 0;
    _project.date = req.body.date;
    _project.creation = new Date().toJSON().slice(0, 10);
    _project.tags = req.body.tags;
    _project.author = req.body.author;
    _project.status = "active";

    _project.pageId = req.body.title.toLowerCase().cleanup();
    let tempTitle = _project.title.toLowerCase().cleanup();

    // tag.addTag(_project.tags);

    Project.findOne({ pageId: tempTitle }, function(err, project) {
        if (project === null) {
            _project.save(function(err) {
                res.status(200);
            });
        }
        if (project) {
            res.status(409).json("please, choose other name for your project")
        } else {
            res.json(err);
        }
    });
}