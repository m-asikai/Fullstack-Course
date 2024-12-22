const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog-helper')

const api = supertest(app)

// Setup for tests.

beforeEach(async () => {
    await Blog.deleteMany({});

    for (const blog of helper.blogs){
        const blogObject = new Blog(blog);
        await blogObject.save()
    }
})

after(async () => {
    await mongoose.connection.close()
  })



describe('General', () => {

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

    test('Post new blog', async () => {
        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 772
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');

        const authors = res.body.map(blog => blog.author);
        assert.strictEqual(res.body.length, helper.blogs.length + 1);
        assert(authors.includes('Japsa Tapsa'));
        assert.strictEqual(blog.likes, res.body[helper.blogs.length].likes);
    })

    test('New blog with likes missing', async () => {
        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
        }

        await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const res = await api.get('/api/blogs');
        assert.equal(res.body[helper.blogs.length].likes, 0);
    })

    
    test('New blog with title or url missing', async () => {
        const blog = {
            title: "Wespa waspa",
            author: "Kapsa Capsa",
            likes: 333,
        }

        await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);
    })

})


describe('Delete tests', () => { 

    test('Delete blog by id', async () => {
        const blog = {
            title: "Kapsan seikkailut",
            author: "Kapsa Capsa",
            url: "127.0.0.1/blog",
            likes: 2727
        }
    
        const saved = await api.post('/api/blogs').send(blog);
        await api.delete(`/api/blogs/${saved.body.id}`)
            .expect(204);
    
    })
    
    test('Delete with invalid id', async () => {
        await api
            .delete('/api/blogs/6768314dbec89faa457c89cc')
            .expect(404)
    })

})


describe('Update tests', () => {

    test('Update by id', async () => {
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
    
        const saved = await api.post('/api/blogs').send(blog);
        const updated = await api.put(`/api/blogs/${saved.body.id}`).send(updatedBlog);
        assert.equal(updated.body.likes, updatedBlog.likes);
        
    })
})
