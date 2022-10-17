const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');

const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const validateMiddleware = require('./middlewares/validationMiddleware');

const PORT = 7000;

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(fileUpload());

app.use('/posts/store', validateMiddleware);

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', storePostController);

// CONNECTING TO DB
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
