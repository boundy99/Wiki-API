const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect('mongodb://localhost:27017/WikiDB');

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', (req, res) => {
    Article.find({}, (err, foundArticles) => {
        if (!err) res.send(foundArticles);
        else res.send(err);
    })
})

app.post('/articles', (req, res) => {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save();
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})