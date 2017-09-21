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
};
module.exports.projectsByUsername = function(req, res) {
    Project.find({ author: req.params.username }, function(err, project) {
        if (err || project === null) {
            res.status(404);
            return;
        }
        res.send(JSON.stringify(project));
    });
};

module.exports.newProjects = function(req, res) {
    var query = Project.find({})
        .sort({ $natural: -1 })
        .limit(6);
    query.exec(function(err, project) {
        if (err || project === null) {
            res.status(404);
            return;
        } else {
            res.send(JSON.stringify(project));
        }
    });
};

module.exports.projects = function(req, res) {
    Project.find({}, function(err, project) {
        if (err || project === null) {
            res.status(404);
            return;
        }
        res.send(JSON.stringify(project));
    });
};

module.exports.actualProjects = function(req, res) {
    var query = Project.find({})
        .sort({ collected: -1 })
        .limit(6);
    query.exec(function(err, project) {
        if (err || project === null) {
            res.status(404);
            return;
        } else {
            res.send(JSON.stringify(project));
        }
    });
};

module.exports.closeProject = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            project.status = "closed";
            res.status(200).json(project);
        }
    });
};

module.exports.projectMarkClosed = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            project.status = "closed";
            res.status(200).json(project);
        }
    });
};

module.exports.projectMarkDone = function(req, res) {
    Project.findOne({ pageId: req.params.pageId }, function(err, project) {
        if (err || project === null) {
            res.status(404).json(err);
        } else {
            project.status = "done";
            res.status(200).json(project);
        }
    });
};

module.exports.projectDonate = function(req, res) {
    let inc = parseInt(req.params.value, 10);
    Project.findOneAndUpdate({ pageId: req.params.pageId }, { $inc: { collected: inc } }, { upsert: true },
        function(err, project) {
            if (err || project === null) {
                res.status(409).json("cannot find project to donate");
            } else {
                console.log(project.collected + inc);
                console.log(project.goal);
                if (project.collected + inc >= project.goal) {
                    Project.findOneAndUpdate({ pageId: req.params.pageId }, { $set: { status: "done" } }, { upsert: true },
                        function(err, project) {}
                    );
                }
                res.status(200).json("Successfully donated " + inc + " $");
            }
        }
    );
};

module.exports.followProjectNews = function(req, res) {
    let follower = req.body.follower;
    Project.findOne({ pageId: req.params.pageId }, (err, project) => {
        if (err || project === null) {
            res.status(404).json(err);
        }
        if (!project.followers.includes(follower)) {
            project.followers.push({ email: follower });
            project.save();
            res.status(200).send(`${follower} follows this project now!`);
        } else {
            res.status(200).send(`${follower} is already following this project.`);
        }
    });
};

module.exports.rateProject = function(req, res) {
    let newRating = {
        user: req.body.user,
        rating: req.body.rating
    }

    Project.findOne({ pageId: req.params.pageId }, (err, project) => {
        if (err || project === null) {
            res.status(404).json(err);
        }
        if (!project.ratings.find(x => x.user === req.body.user)) {
            project.ratings.push(newRating);
            project.save();
            const average = project.ratings.reduce(function(acc, obj) { return acc + parseInt(obj.rating); }, 0) / project.ratings.length
            res.json(average);
        }
    });

};