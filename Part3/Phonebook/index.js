const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (req, res) => {
  if (req.method === 'POST'){
    return JSON.stringify(req.body);
  }
  return `Method ${req.method}: ${req.path}`;
})

app.use(morgan(':body'));

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]




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

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person){
    return response.json(person);
  }
  response.status(404).end();
})


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
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

  const id = persons.length + 1;
  const person = {
    id: id,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person);
  response.json(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// Mongo -------


const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


const url = process.env.MONGODB_URI;
mongoose.set('strictQuery',false)
mongoose.connect(url);


const personSchema = new mongoose.Schema({
id: Number,
name: String,
number: String,
})

personSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
// id: Math.floor(Math.random() * 100_000),
// name: name || "Default name",
// number: number || "123 456 789"
// })


// if (name && number) {
//   person.save().then(res => {
//     console.log(res);
//     mongoose.connection.close();
//   });
// }
// else {
//   Person.find({}).then(res => {
//     console.log('Phonebook: ')
//     res.forEach(person => {
//       console.log(person);
//     })
//   mongoose.connection.close();
//   });
// }