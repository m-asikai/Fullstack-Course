const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const res = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(res);
});



blogRouter.post('/', middleware.getToken, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });

  if (!blog.title || !blog.url){
    return response.status(400).end();
  }
  if (!blog.likes) {
    blog.likes = 0;
  }


  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});



blogRouter.delete('/:id', middleware.getToken, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const blog = await Blog.findById(id);
  if (!user){
    return res.status(401).json({error: 'User not found.'});
  }
  if (!blog){
    res.status(404).json({ error: 'Blog not found.' });
  }
  if (blog.user.toString() !== user.id.toString()){
    return res.status(401).json({error: 'Incorrect user.'});
  }
  const deleted = await Blog.findByIdAndDelete(id);
  if (deleted) {
    res.status(204).json(deleted).end(); 
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