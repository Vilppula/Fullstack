const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)

  next()
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request['token']= auth.substring(7)
  }
  
  next()  
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const permission = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(permission.id)
    if (user) {
      request['user'] = user._id
    }
  }
  
  next()  
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformated id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  }
  next(error)
}


module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  errorHandler
}