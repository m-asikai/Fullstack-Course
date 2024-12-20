const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
const Person = require('./Model/phonebook');

morgan.token('body', (req, res) => {
  if (req.method === 'POST'){
    return JSON.stringify(req.body);
  }
  return `Method ${req.method}: ${req.path}`;
})

app.use(morgan(':body'));


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
})

app.get('/api/info/', (request, response) => {
  const date = new Date();
  const html = `
    <p>Phonebook has info of ${persons.length} people.</p>
    <p>${date}</p>
    `
  response.send(html);
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person){
      response.json(person);
    }
    else {
      response.status(404).end();
    }
  }).catch(e => {
    next(e);
  })
})


app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(result => {
      if (result){
        res.status(204).end();
      } 
      else {
        res.status(404).send({error: 'Person not found.'});
      }
    }).catch(e => {
      next(e);
    })
})

app.post('/api/persons/', (request, response) => {
  const body = request.body;

  const exists = persons.some(person => person.name === body.name);
  if (exists){
    return response.status(418).json({
      error: 'Person is already in the phonebook.'
    })
  }

  if (!body.name || !body.number){
    return response.status(418).json({
      error: 'Missing info.'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(person => {
    response.json(person);
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  console.log('UPDATE');
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(p => {
      res.json(p);
    })
    .catch(e => next(e))

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id.'});
  }
  next(error);
}

app.use(errorHandler);