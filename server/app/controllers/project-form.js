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

    _project.save(function(err){
        if (err) return handleError(err);
        
        res.status(200);
        res.json({
            title: _project.title,
            description: _project.description,
            body: _project.body,
            image: _project.image,
            goal: _project.goal,
            date: _project.date,
            tags: _project.tags
        });
    });
}