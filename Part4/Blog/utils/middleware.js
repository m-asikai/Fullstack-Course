const logger = require('./logger')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('express-async-errors');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({error: 'Expected username to be unique.'});
  }
  else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error: 'Token invalid.'})
  }

  next(error)
}

const getToken = async (req, res, next) => {
  let auth = req.get('authorization');
  if (auth && auth.startsWith('Bearer ')){
    auth = auth.replace('Bearer ', '');
  }
  if (auth){
      req.token = auth;
      const decoded = jwt.verify(auth, process.env.SECRET);
      const user = await User.findById(decoded.id);
      if (!user){
        return res.status(401).json({error: 'Token invalid.'})
      } 
      req.user = user
  }
  next();

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
}