import { useEffect, useState } from 'react';
import personService from './Services/PersonService';
import Shower from './Components/Shower';
import Filter from './Components/Filter';
import AddForm from './Components/AddForm';
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setFilter] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [notification, setNotificationMessage] = useState(null);
  const [messageType, setMessageType] = useState('notification');

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data);
        setPersonsToShow(data);
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
    const existingUser = persons.find(person => person.name == newName);
    if (existingUser){
      if (window.confirm(`${existingUser.name} is already exists. Do you want to update their info?`)){
      const updatedUser = {...existingUser, number: `${newNumber}`};
      personService
        .update(updatedUser)
        .then(res => {
          console.log(res);
          const newEntries = persons.map(person => person.name !== updatedUser.name ? person : updatedUser);
          setPersons(newEntries);
          setPersonsToShow(newEntries);
        })
        .catch(err => {
          setMessageType('error');
          setNotificationMessage(`${updatedUser.name} was not found.`)
          setTimeout(() => {
            setNotificationMessage(null);
            }, 2000);
        })
      }
    }

    // if (persons.some(persons => persons.name === newName)){
    //   alert(`${newName} already exists.`);
    // }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`
      }
      const entries = persons.concat(newPerson)
      personService
        .save(newPerson)
        .then(res => {
          console.log(res);
        })
      setPersons(entries);
      const filtered = entries.filter(person => 
        person.name
        .toLowerCase()
        .startsWith(newFilter.toLowerCase())
      );
      setPersonsToShow(filtered);
      setMessageType('notification')
      setNotificationMessage(`${newPerson.name} added successfully.`)
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
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

  const handleDelete = id => {
    if (window.confirm(`Are you sure you want to delete ${persons[id - 1].name}?`))
      personService
        .deletePerson(id)
        .then(res => {
          const newEntries = persons.filter(person => person.id !== id);
          setPersons(newEntries);
          setPersonsToShow(newEntries);
        })
        .catch(err => {
          console.log(err);
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <Notification message={notification} type={messageType}/>
      <AddForm handleAdd={handleAdd} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Shower personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App