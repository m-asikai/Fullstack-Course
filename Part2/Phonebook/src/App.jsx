import { useState } from 'react'
import Shower from './Components/Shower';
import Filter from './Components/Filter';
import AddForm from './Components/AddForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }

  const handleNewNumber = e => {
    setNewNumber(e.target.value);
  }

  const handleAdd = e => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some(persons => persons.name === newName)){
      alert(`${newName} already exists.`);
    }
    else {
      const entries = persons.concat(newPerson)
      setPersons(entries);
      const filtered = entries.filter(person => 
        person.name
        .toLowerCase()
        .startsWith(newFilter.toLowerCase())
      );
      setPersonsToShow(filtered);
    }
  }

  const handleFilter = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    const filtered = persons.filter(person => 
      person.name
      .toLowerCase()
      .startsWith(filterValue.toLowerCase())
    );
    setPersonsToShow(filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <AddForm handleAdd={handleAdd} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <Shower personsToShow={personsToShow} />
      <h2>Numbers</h2>
    </div>
  )
}

export default App