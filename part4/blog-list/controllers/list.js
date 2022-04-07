const listRouter = require('express').Router()
const Blog = require('../models/list')

listRouter.get('/', async (req, res) => {
  const result = await Blog.find({})
  res.json(result)
})

// listRouter.get('/:id', (req, res) => {

// })

listRouter.post('/', async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  if (blog.title && blog.url) {
    let result = await blog.save()
    res.status(201).json(result) 
  } else {
  }
})

// listRouter.delete('/', (req, res) => {

// })

// listRouter.put('/:id', (req, res) => {

// })

module.exports = listRouter