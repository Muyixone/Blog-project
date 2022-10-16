const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');

const BlogPost = require('./models/BlogPost');

const path = require('path');

const PORT = 7000;

const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(fileUpload());

// MIDDLEWARE FUNCTION FOR /post/store
const validateMiddleware = (req, res, next) => {
  if (req.files == 'null' || req.body == 'null' || req.body.title == 'null') {
    return res.redirect('/posts/new');
  }
  next;
};

app.use('/posts/store', validateMiddleware);

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({});
  res.render('index', {
    blogposts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const blogpost = await BlogPost.findById(id);
  res.render('post', {
    blogpost,
  });
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
    await BlogPost.create({
      ...req.body,
      image: '/img/' + image.name,
    });
    res.redirect('/');
  });
});

// CONNECTING TO DB
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
