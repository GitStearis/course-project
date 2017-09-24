const mongoose = require("mongoose");
const elasticlunr = require("elasticlunr");
const Project = require("../models/projects");
var User = require("../models/users");
const dbURI = "mongodb://root:root@ds119524.mlab.com:19524/course-project";

mongoose.connect(dbURI, {
    useMongoClient: true
  });

elasticlunr.clearStopWords();
const index = elasticlunr(function() {
    // this.use(elasticlunr.ru);
  
    this.addField("title");
    this.addField("body");
  
    this.setRef("id");
  });

mongoose.Promise = Promise; 

// let documents = [{
//     id: 1,
//     title: 'Twelfth Night',
//     body: 'If music be the food of love, play on'
// }, {
//     id: 2,
//     title: 'Macbeth',
//     body: 'When shall we three meet again, In thunder, lightning, or in rain?'
// }, {
//     id: 3,
//     title: 'Richard III',
//     body: 'Macbeth Now is the winter of our discontent, Made glorious summer by this sun of York;'
// }]

// CONNECTION EVENTS
mongoose.connection.on("connected", async function() {
  console.log("Mongoose connected to " + dbURI);

  console.log(1);

  let projects = await Project.find({});

  projects.forEach(proj => addToIndex(proj));

  console.log("start...");
  console.log(2);

  let results = index.search("for", {
    bool: "OR",
    expand: true
  });

  let a = results.map(({ ref }) => Project.findOne({ _id: ref }));

  let items = await Promise.all(a);
    // .then(items => items.forEach(i => console.log(i.title)))
    items.forEach(i => console.log(i.title));

//   console.log(results);
});

function addToIndex(project) {
//   let id = Math.floor(Math.random() * (20 - 1)) + 1;
  let newDocument = {
    "id": project._id,
    "title": project.title,
    // "description": project.description,
    "body": project.body
  };

  index.addDoc(newDocument);
}

// Project.find({}, function(err, project) {
//     if (err || project === null) {
//       console.log("error occured");
//       return;
//     }
//     addToIndex(project);
//     console.log("success!");
//     return;
//   });

// documents.forEach(function(doc) {
//     console.log(doc);
//     addToIndex(doc);
// });

// let results = index.search('Macbeth', {
//     bool: "OR",
//     expand: true
//   });
//  console.log(results);
