const jwt = require('jsonwebtoken')
const listRouter = require('express').Router()
const Blog = require('../models/list')
const User = require('../models/user')

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.substring(7)
  }
  return null
}

listRouter.get('/', async (req, res) => {
  const result = await Blog
    .find({})
    .populate('user', { username: 1 })
  res.json(result)
})

listRouter.get('/:id', async (req, res) => {
  let id = req.params.id
  const result = await Blog.findById(id)
  res.json(result)
})

listRouter.post('/', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  if (blog.title && blog.url) {
    let savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog) 
  } else {
    res.status(400).json({ error: 'missing required fields'})
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