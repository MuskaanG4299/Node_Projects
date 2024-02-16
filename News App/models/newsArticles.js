const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    title: { type: String, index: true },
    summary: String,
    imageUrl: String,
    description: String,
    date: Date,
    type: String,
});

const NewsArticle = mongoose.model('Articles', newsArticleSchema);

module.exports = NewsArticle;
