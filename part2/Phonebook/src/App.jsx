import { useState, useEffect } from 'react'
import axios from 'axios';

const Filter = (props) => {
  console.log(props)
  return (  
  <div>
    filter shown with<input onChange={props.findName}/>
  </div>
  )

}

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return(
      <form onSubmit={addPerson}>
        <div>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
        </div>
        <div>
          <button type="submit" >
            add
          </button>
        </div>
      </form>
  )
}


const Persons = ({personToShow}) => {
  return(
    personToShow.map(person => 
      <p key={person.id}>{person.name} {person.number}</p>
      )
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    let personName = persons.map(person => person.name)
    if (personName.includes(newName)) alert(`${newName} is already added to phonebook`)
    else{
      setPersons( () => persons.concat({name: newName, number: newNumber, id: String(persons.length + 1)}))
    }
    setNewName('')
    setNewNumber('')
    console.log(personName)
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

  return (
    <div>
      <h2>Phonebook</h2>

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

      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App