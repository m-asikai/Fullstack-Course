import { useEffect, useState } from 'react';
import axios from 'axios';
import Shower from './Components/Shower';
import Filter from './Components/Filter';
import AddForm from './Components/AddForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data);
          setPersonsToShow(response.data);
        })
  }, []);

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
      <h2>Numbers</h2>
      <Shower personsToShow={personsToShow} />
    </div>
  )
}

export default App