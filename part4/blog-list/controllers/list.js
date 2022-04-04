const listRouter = require('express').Router()
const Blog = require('../models/list')

listRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

// listRouter.get('/:id', (req, res) => {

// })

listRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

// listRouter.delete('/', (req, res) => {

// })

// listRouter.put('/:id', (req, res) => {

// })

module.exports = listRouter