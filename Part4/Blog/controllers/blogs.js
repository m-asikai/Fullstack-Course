const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const res = await Blog.find({});
  response.json(res);
});

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if (!blog.title || !blog.url){
      return response.status(400).end();
    }
    if (!blog.likes) {
      blog.likes = 0;
    }
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleted = await Blog.findByIdAndDelete(id);
  if (deleted) {
    res.status(204).json(deleted).end(); 
  }
  else {
    res.status(404).send({ error: 'Blog not found.' });
  }
})


blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const updated = await Blog.findByIdAndUpdate(id, body, { new: true });
  if (updated){
    res.json(updated).end();
  }
  else {
    res.status(404).send({ error: 'Blog not found.' });
  }
})

module.exports = blogRouter;