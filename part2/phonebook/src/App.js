import { useState, useEffect } from 'react'
import AddNewPerson from './components/AddNewPerson'
import DisplayPhonebook from './components/DisplayPhonebook'
import Search from './components/Search'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newPhoneNr, setNewPhoneNr] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`person with name '${newName}' already defined`)
    } else {
      const newPerson = {
        id: persons.length +1,
        name: newName,
        phoneNr: newPhoneNr
      }
      setPersons(persons.concat([newPerson]))
    }
    setNewName('')
    setNewPhoneNr('')
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
      <DisplayPhonebook persons={persons} search={search}/>
    </div>
  )
}

export default App