var mongoose = require("mongoose");
const DB_CONNECT_URL = 'mongodb://root:root@ds119524.mlab.com:19524/course-project';

mongoose.connect(DB_CONNECT_URL, {
    useMongoClient: true
});