const MongoClient = require('mongodb').MongoClient;
const dbURI = "mongodb://root:root@ds119524.mlab.com:19524/course-project";

let tagList;

MongoClient.connect(dbURI, (err, db) => {
    if (!err) {
        // app.locals.dbTags = db;
        tagList = db;
    } else {
        console.log('Unable to connect to "course-project" database.');
    };
});

module.exports.addTag = function (tagsNew) {
    let list = tagList.collection('tag_list').findOne();
    let tags = list.tags;
    tags.push(...tagsNew);
}
