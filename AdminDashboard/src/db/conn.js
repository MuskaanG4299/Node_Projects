const mongoose = require("mongoose");

console.log("Attempting to connect to the database...");
mongoose.connect('mongodb://mongo_db:27017/NewsArticles', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log(`Connection to NewsArticles database successful`);
}).catch((e) => {
    console.log(`Error connecting to NewsArticles database: ${e.message}`);
});

module.exports = mongoose.connection;
