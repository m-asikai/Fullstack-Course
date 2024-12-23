const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog-helper')

const api = supertest(app)

// Setup for tests.


after(async () => {
    await mongoose.connection.close()
  })



describe('General', () => {

    beforeEach(async () => {
        await Blog.deleteMany({});
    
        for (const blog of helper.blogs){
            const blogObject = new Blog(blog);
            await blogObject.save()
        }
    })

    test('notes are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('Blog identifier', async () => {
    const res = await api.get('/api/blogs');
    const blogKeyNames = Object.keys(res.body[0]);

    assert(blogKeyNames.includes('id'));
    assert(!blogKeyNames.includes('_id'));

    })
})


describe('Post tests', () => {

    beforeEach(async () => {
        await Blog.deleteMany({});
    
        for (const blog of helper.blogs){
            const blogObject = new Blog(blog);
            await blogObject.save()
        }
    })

    test('Post new blog', async () => {

        await User.deleteMany({});

        const user = new User({
            username: 'Admin',
            name: 'Antti',
            password: 'Admin',
        })

        await user.save();

        const userForToken = {
            username: 'Admin',
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)


        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 772
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');

        const authors = res.body.map(blog => blog.author);
        assert.strictEqual(res.body.length, helper.blogs.length + 1);
        assert(authors.includes('Japsa Tapsa'));
        assert.strictEqual(blog.likes, res.body[helper.blogs.length].likes);
    })

    test('Unauthorized blog creation.', async () => {

        const token = process.env.HARDCODED_TOKEN;
        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 772
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    })

    test('New blog with likes missing', async () => {

        await User.deleteMany({});

        const user = new User({
            username: 'Admin',
            name: 'Antti',
            password: 'Admin',
        })

        await user.save();

        const userForToken = {
            username: 'Admin',
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
        }

        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');
        assert.equal(res.body[helper.blogs.length].likes, 0);
    })

    
    test('New blog with title or url missing', async () => {

        await User.deleteMany({});

        const user = new User({
            username: 'Admin',
            name: 'Antti',
            password: 'Admin',
        })

        await user.save();

        const userForToken = {
            username: 'Admin',
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        const blog = {
            title: "Wespa waspa",
            author: "Kapsa Capsa",
            likes: 333,
        }

        await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    })

})


describe('Delete tests', () => { 

    test('Delete blog by id', async () => {

        await User.deleteMany({});

        const user = new User({
            username: 'Admin',
            name: 'Antti',
            password: 'Admin',
        })

        await user.save();

        const userForToken = {
            username: 'Admin',
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 2727,
            user: user._id,
        }
    
        const saved = await api.post('/api/blogs')
                            .send(blog)
                            .set('Authorization', `Bearer ${token}`);
        await api
            .delete(`/api/blogs/${saved.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
    
    })
    
    test('Delete with invalid id', async () => {

        await User.deleteMany({});

        const user = new User({
            username: 'Admin',
            name: 'Antti',
            password: 'Admin',
        })

        await user.save();

        const userForToken = {
            username: 'Admin',
            id: user._id,
        }
        console.log(user)
        const token = jwt.sign(userForToken, process.env.SECRET)

        await api
            .delete('/api/blogs/6768314dbec89faa457c89cc')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    })

})


describe('Update tests', () => {

    test('Update by id', async () => {

        await User.deleteMany({});

        const user = new User({
            username: 'Admin',
            name: 'Antti',
            password: 'Admin',
        })

        await user.save();

        const userForToken = {
            username: 'Admin',
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 2727
        }
    
        const updatedBlog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 55
        }
    
        const saved = await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`);
        const updated = await api.put(`/api/blogs/${saved.body.id}`).send(updatedBlog);
        assert.equal(updated.body.likes, updatedBlog.likes);
        
    })
})

describe('Hash tests', () => {

    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('password', 5);
        const user = new User({
            username: 'root', 
            passwordHash
        });

        await user.save();
    })

    test('Create user with hashed password', async () => {
        const users = await helper.getUsers();
   
        const newUser = {
            username: 'Admin',
            name: 'Antti',
            password: 'admin',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.getUsers();

        assert.strictEqual(userAtEnd.length, users.length + 1);

        const failedUser = {
            username: 'Ad',
            name: 'Antti',
            password: 'admin',
        }

        await api
        .post('/api/users')
        .send(failedUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    })
})
