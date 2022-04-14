const jwt = require('jsonwebtoken')
const listRouter = require('express').Router()
const Blog = require('../models/list')
const User = require('../models/user')
const middleware = require('../utilities/middleware')

listRouter.get('/', async (req, res) => {
  const result = await Blog
    .find({})
    .populate('user', { username: 1 })
  res.json(result)
})

// OLD get blog post by blog post id
// listRouter.get('/:id', async (req, res) => {
//   let id = req.params.id
//   const result = await Blog.findById(id)
//   res.json(result)
// })

// NEW get blog posts by user id
listRouter.get('/:userId', async (req, res) => {
  let userId = req.params.userId
  const result = await Blog.find({ user: userId })
  res.json(result)
})

listRouter.post('/', middleware.userIdExtractor, async (req, res) => {
  const body = req.body
    
  if (!req.userid) {
    return res.status(401).json({ error: 'invalid user' })
  }
  
  const user = await User.findById(req.userid)

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

listRouter.delete('/:id', middleware.userIdExtractor, async (req, res, next) => {
  if (!req.userid) {
    return res.status(401).json({ error: 'invalid user' })
  }

  const blog = await Blog.findById(req.params.id)
  
  if (req.userid === blog.user.toString()) {  
    try {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  } else {
    res.status(401).json({ error: 'blog can only be deleted by the user that added it'})
  }
})

listRouter.put('/:id', middleware.userIdExtractor, async (req, res, next) => {
  if (!req.userid) {
    return res.status(401).json({ error: 'invalid user' })
  }
  
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