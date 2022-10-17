const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  const { id } = req.params;
  const blogpost = await BlogPost.findById(id);
  res.render('post', {
    blogpost,
  });
};
