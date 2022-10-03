import PhonebookEntry from './PhonebookEntry'

const DisplayPhonebook = ({ persons, search, deletePerson }) =>
    <ul>
    {
    persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
            .map(person => <PhonebookEntry key={person.id} person={person} handleDelete={() => deletePerson(person.id, person.name)}/>)
    }
    </ul>

export default DisplayPhonebook