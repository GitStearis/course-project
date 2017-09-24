const elasticlunr = require('elasticlunr');
require('../elasticlunr-config/lunr.stemmer.support.js')(elasticlunr);
require('../elasticlunr-config/lunr.ru.js')(elasticlunr);

const index = elasticlunr(function(){
  this.use(elasticlunr.ru);

  this.addField('title');
  this.addField('description');
  this.addField('body');

  this.setRef('id');
});

module.exports.addToIndex =  function (project) {
  let newDocument = {
    "title": project.title,
    "description": project.description,
    "body": project.body
  };

  index.addDoc(newDocument);
}

module.exports.removeFromIndex =  function (existingDoc) {
  index.removeDoc(existingDoc);
}

module.exports.updateDocInIndex =  function (editingProject) {
  let updatingDocument = {
    // "id": 1,
    "title": editingProject.title,
    "description": editingProject.description,
    "body": editingProject.body
  };

  index.updateDoc(updatingDocument);
}

module.exports.searchQuery = function(req, res) {
  let query = decodeURI(req.param('q'));
  let results = index.search(query, {
    bool: "OR",
    expand: true
  });
  console.log(results);
}