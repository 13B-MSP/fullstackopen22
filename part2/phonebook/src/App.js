import { useState } from 'react'
import AddNewPerson from './components/AddNewPerson'
import DisplayPhonebook from './components/DisplayPhonebook'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNr: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNr: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNr: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNr: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNr, setNewPhoneNr] = useState('')
  const [search, setSearch] = useState('')

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