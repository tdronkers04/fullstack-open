const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique'})
  } else if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required'})
  } else if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'username and password must be at least 3 characters long'})
  }

  const salRounds = 10
  const passwordHash = await bcrypt.hash(password, salRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1})
  
  res.json(users)
})

module.exports = usersRouter