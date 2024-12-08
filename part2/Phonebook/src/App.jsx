import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons';

import PersonService from './services/persons'
import Notification  from './components/Notification';
import ErrorNotification  from './components/ErrorNotification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null) 

  const hook = () => {
    PersonService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    let personToUpdate = persons.filter(person => newName === person.name)
    
    if (personToUpdate.length != 0){
      personToUpdate = personToUpdate[0]
      if (personToUpdate.name === newName && (personToUpdate.number === newNumber)){ 
        alert(`${newName} is already added to phonebook`)
      }
      else if (personToUpdate.name === newName){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
          const updatedPerson = {...personToUpdate, number: newNumber}
          PersonService
            .update(personToUpdate.id, updatedPerson)
            .then(updatedObject => {
              setPersons(persons.map(person => person.id === updatedObject.id ? updatedObject : person));
              setMessage(`Updated ${newName}'s number`)
              setTimeout(() =>{
                setMessage(null)
              }, 5000)
            });
        }
      }      
    }
    else{
      const newPerson = {
        name: newName, 
        number: newNumber
      }
      PersonService 
        .create(newPerson)
        .then(updatedPerson => {
          setPersons(persons.concat(updatedPerson))
          setMessage(`Added ${newName}`)
          setTimeout(() =>{
            setMessage(null)
          }, 5000)
        });
    }

    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const findName = (event) => {
    if (event.target.value === '') setShowAll(true);
    else setShowAll(false)
    setSearchName(event.target.value)
    
  }

  const personToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

  const deletePerson = id =>{
    const personToDetlete = persons.find(person => person.id === id)
    if( window.confirm(`delete ${personToDetlete.name} ?`)){
      PersonService
        .deleteObject(id)
        .then(updatedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error=>{
          setErrorMessage(`Information of ${personToDetlete.name} has already been removed from the server`)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() =>{
            setErrorMessage(null)
          }, 5000)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />

      <Filter findName={findName} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <div>
        {personToShow.map(person =>
          <Persons 
            key={person.id}
            person = {person}
            deletePerson={() => deletePerson(person.id)}
          />
        )}        
      </div>

    </div>
  )
}

export default App