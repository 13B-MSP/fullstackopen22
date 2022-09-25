import { useState, useEffect } from 'react'
import AddNewPerson from './components/AddNewPerson'
import DisplayPhonebook from './components/DisplayPhonebook'
import Search from './components/Search'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNr, setNewPhoneNr] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} already in phonebook, update new number?`)) {
        const updatedPerson = { ...existingPerson, number: newPhoneNr }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson)))
      }
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNr
      }
      personService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat([returnedPerson])))
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