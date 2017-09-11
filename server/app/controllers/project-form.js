const mongoose = require("mongoose");
const Project = require("../models/projects");

module.exports.createProject = function(req, res) {
    _project = new Project();

    _project.title = req.body.title;
    _project.description = req.body.description;
    _project.body = req.body.body;
    _project.image = req.body.image;
    _project.goal = req.body.goal;
    _project.date = req.body.date;
    _project.tags = req.body.tags;

    _project.pageId = req.body.title.toLowerCase().replace(/\s/g, '-');
    let tempTitle = _project.title.toLowerCase().replace(/\s/g, '-');

    Project.findOne({ pageId: tempTitle }, function(err, project) {
        if (project === null) {
            _project.save(function(err) {
                res.status(200).json("Successfully created!");
            });
        }
        if (project) {
            res.status(409).json("please, choose other name for your project")
        } else {
            res.json(err);
        }
    });
}