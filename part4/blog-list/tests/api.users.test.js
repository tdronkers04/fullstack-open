const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })

  test('creation succeeds with a new username', async () => {
    let usersAtStart = await User.find({})
    
    const newUser = {
      username: 'tdronkers04',
      name: 'Tim Dronkers',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    let usernames = usersAtEnd.map(obj => obj.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Super User',
      password: 'abc123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper status code and msg if username /pw are omitted', async () => {
    const newUserA = {
      username: "",
      name: "unknown",
      password: "123"
    }

    const resultA = await api
      .post('/api/users')
      .send(newUserA)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(resultA.body.error).toEqual('username and password are required')

    const newUserB = {
      username: "unknown",
      name: "unknown",
      password: ""
    }

    const resultB = await api
      .post('/api/users')
      .send(newUserA)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(resultB.body.error).toEqual('username and password are required')
  })

  test('creation fails with proper status code and msg if username/ pw are < 3 chars', async () => {
    const newUserA = {
      username: "unknown",
      name: "unknown",
      password: "X"
    }

    const resultA = await api
      .post('/api/users')
      .send(newUserA)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(resultA.body.error).toEqual('username and password must be at least 3 characters long')
  })
})