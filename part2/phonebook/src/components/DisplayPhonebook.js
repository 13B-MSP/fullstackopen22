import PhonebookEntry from './PhonebookEntry'

const DisplayPhonebook = ({ persons, search }) =>
    <ul>
    {
    persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
            .map(person => <PhonebookEntry key={person.id} person={person}/>)
    }
    </ul>

export default DisplayPhonebook