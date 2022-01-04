const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')


usersRouter.get('/', async (request, response) => {
  const userList = await User.find({})
    .populate('blogs', {title: 1, author: 1, url: 1})
  response.json(userList.map(user => user.toJSON()))
})


usersRouter.post('/', async (request, response) => {
  const userData = request.body
  const passwordLength = userData.password.length
  if (passwordLength < 3) {
    return response.status(400).send({error: 'Password should contain at least 3 digits'})
  }
  const rounds = 10
  const passwordHash = await bcrypt.hash(userData.password, rounds)
  const newUser = new User({
    username: userData.username,
    name: userData.name,
    passwordHash
  })
  const savedUser = await newUser.save()
  response.json(savedUser)
})



module.exports = usersRouter