const testRouter = require('express').Router()
const Blog = require('../models/list')
const User = require('../models/user')

testRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

testRouter.get('/', (req, res) => {
  res.status(200).json({status: "test router works"})
})

module.exports = testRouter