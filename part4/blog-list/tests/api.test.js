const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/list')

const initialBlogs = [
  {
    title: "All Things Distributed",
    author: "Werner Vogels",
    url: "https://www.allthingsdistributed.com/",
    likes: 101
  },
  {
    title: "Kent's JavaScript Blog",
    author: "Kent C. Dodds",
    url: "https://kentcdodds.com/blog",
    likes: 73,
  },
  {
    title: "Wes Bos Blog",
    author: "Wes Bos",
    url: "https://wesbos.com/blog",
    likes: 733,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[2])
  await blogObj.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body).toHaveLength(initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
  const result = await api.get('/api/blogs')
  const contents = result.body.map(obj => obj.title)
  expect(contents).toContain('Wes Bos Blog')
})

test('unique identifier property is named "id"', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body[0]['id']).toBeDefined()
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: "CSS Tricks",
    author: "various authors",
    url: "https://css-tricks.com/",
    likes: 5045
  }
  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  let result = await api.get('/api/blogs')
  result = result.body.map(obj => obj.title)
  expect(result).toHaveLength(initialBlogs.length + 1)
  expect(result).toContain("CSS Tricks")
})

test('likes property defaults to zero if undefined', async () => {
  const newBlog = {
    title: "Notes On JS and Other Stuff",
    author: "Tim Dronkers",
    url: "https://blog.dronkers.dev",
  }
  await api 
    .post('/api/blogs')
    .send(newBlog)
    
  let result = await api.get('/api/blogs')
  timsBlogLikes = result.body.filter(obj => obj.author === "Tim Dronkers")[0].likes
  expect(timsBlogLikes).toBe(0)
})

test('POST request without title AND url properties results in 400 Bad Request', async () => {
  const newBlog = {
    likes: 666
  }

  api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})