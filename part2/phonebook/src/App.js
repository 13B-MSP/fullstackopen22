import { useState, useEffect } from 'react'
import AddNewPerson from './components/AddNewPerson'
import DisplayPhonebook from './components/DisplayPhonebook'
import Notification from './components/Notification'
import Search from './components/Search'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNr, setNewPhoneNr] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({message: null, cssClassName: null})

  useEffect(() => {
    personService.getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])
  
  const showNotification = (message, cssClassName='notification') => {
    setNotification({message: message, cssClassName: cssClassName})
    setTimeout(
      () => {
        setNotification({message: null, cssClassName: null})
      }, 5000)
  }
  const showError = (message) => showNotification(message, 'error')

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} already in phonebook, update new number?`)) {
        const updatedPerson = { ...existingPerson, number: newPhoneNr }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            showNotification(`updated ${returnedPerson.name} number to ${returnedPerson.number}`) 
          })
          .catch((error) => {
            showError(
              `person with name ${existingPerson.name} no longer exists`
            )
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNr
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat([returnedPerson]))
          showNotification(`Added ${returnedPerson.name}`)
        })
    }
    setNewName('')
    setNewPhoneNr('')
  }
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} cssClassName={notification.cssClassName}/>
      <Search search={search} handleSearchChanged={e => setSearch(e.target.value)}/>
      <h2>Add new</h2>
      <AddNewPerson
        addPerson={addPerson} newName={newName} newPhoneNr={newPhoneNr}
        handleNameChange={e => setNewName(e.target.value)}
        handlePhoneNrChange={e => setNewPhoneNr(e.target.value)}/>
      <h2>Numbers</h2>
      <DisplayPhonebook persons={persons} search={search} deletePerson={deletePerson}/>
    </div>
  )
}

export default App