import { useState } from 'react'
import AllNumbers from './components/Display'
import Search from './components/Search'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '415-230-7789'},]) 
  const [newPerson, setNewPerson] = useState({ name: '', phone: ''})
  const [ searchTerm, setSearchTerm ] = useState('')

  const addContact = (event) => {
    event.preventDefault();
    let found = persons.findIndex(person => person.name === newPerson.name);
    if (found !== -1) {
      alert(`${newPerson.name} already exists in the phonebook!`)
      setNewPerson({ name: '', phone: ''})
    } else {
      setPersons(persons.concat([newPerson]));
      setNewPerson({ name: '', phone: ''})
    }
  }

  const handleFormChange = (event) => {
    if (event.target.id === 'name') {
      setNewPerson(Object.assign({}, newPerson, {name: event.target.value}))
    } else {
      setNewPerson(Object.assign({}, newPerson, {phone: event.target.value}))
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const contactsToShow = persons.filter(person => {
    if (!searchTerm) {
      return true;
    } else {
      return person.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Search callback={handleSearchChange}/>
      <h2>Add New:</h2>
      <Form 
        addContact={addContact} 
        handleFormChange={handleFormChange}
        newPerson={newPerson}
        />
      <h2>Numbers</h2>
      <AllNumbers contacts={contactsToShow} />
    </div>
  )
}

export default App