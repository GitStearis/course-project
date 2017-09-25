const mongoose = require("mongoose");
const elasticlunr = require("elasticlunr");
require("../elasticlunr-config/lunr.stemmer.support.js")(elasticlunr);
require("../elasticlunr-config/lunr.ru.js")(elasticlunr);
require("../elasticlunr-config/lunr.multi.js")(elasticlunr);
const Project = require("../models/projects");

mongoose.Promise = Promise;

elasticlunr.clearStopWords();

const index = elasticlunr(function() {
  this.use(lunr.multiLanguage('en', 'ru'));

  this.addField("title");
  this.addField("description");
  this.addField("body");
  this.addField("tags");

  this.setRef("id");
});

let projects = Project.find({}).then(projects =>
  projects.map(p => addToIndex(p))
);

function addToIndex(project) {
  let newDocument = {
    id: project._id,
    title: project.title,
    description: project.description,
    body: project.body,
    tags: project.tags
  };
  console.log(newDocument);
  index.addDoc(newDocument);
}

module.exports.removeFromIndex = function(existingDoc) {
  index.removeDoc(existingDoc);
};

module.exports.updateDocInIndex = function(editingProject) {
  let updatingDocument = {
    id: editingProject._id,
    title: editingProject.title,
    description: editingProject.description,
    body: editingProject.body,
    tags: editingProject.tags
  };

  index.updateDoc(updatingDocument);
};

function searchQuery(query) {
  let decodeQuery = decodeURI(query);
  let results = index.search(decodeQuery, {
    bool: "OR",
    expand: true
  });
  return results;
}

module.exports.projectsBySearch = async function(req, res) {
  let refArray = searchQuery(req.query["q"]); 
  let promiseArray = refArray.map(({ ref }) => Project.findOne({ _id: ref }));
  console.log(promiseArray);
  let results = await Promise.all(promiseArray);
  res.status(200).send(results);
};

module.exports = {
  addToIndex: addToIndex
}