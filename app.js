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

app.route('/articles')

.get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (!err) res.send(foundArticles);
            else res.send(err);
        })
    })
    .post((req, res) => {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(err => {
            if (!err) res.send("Successfully added")
            else res.send(err)
        });
    })
    .delete((req, res) => {

        Article.deleteMany({}, err => {
            if (!err) res.send("Successfully deleted")
            else res.send(err)
        })
    });


app.route('/articles/:articlePost')
    .get((req, res) => {
        Article.findOne({ title: req.params.articlePost }, (err, foundArticle) => {
            if (!err) res.send(foundArticle)
            else res.send("No article found")
        })
    })

.put((req, res) => {
    Article.replaceOne({ title: req.params.articlePost }, { title: req.body.title, content: req.body.content },
        err => {
            if (!err) res.send("Successfully updated")
            else res.send(err)
        }
    )
})

.patch((req, res) => {
    Article.updateOne({ title: req.params.articlePost }, { $set: req.body },
        err => {
            if (!err) res.send("Successfully updated")
            else res.send(err)
        }
    )
})



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})