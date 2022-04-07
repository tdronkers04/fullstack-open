const listRouter = require('express').Router()
const Blog = require('../models/list')

listRouter.get('/', async (req, res) => {
  const result = await Blog.find({})
  res.json(result)
})

listRouter.get('/:id', async (req, res) => {
  let id = req.params.id
  const result = await Blog.findById(id)
  res.json(result)
})

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

listRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

listRouter.put('/:id', async (req, res, next) => {
  let id = req.params.id
  let data = req.body
  
  try {
    let result = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' })
    res.json(result)
  } catch(error) {
    next(error)
  }
})

module.exports = listRouter