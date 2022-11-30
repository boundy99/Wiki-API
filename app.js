const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articlesSchema = {
    name: String,
}

const ARTICLES = mongoose.model('ARTICLES', articlesSchema);