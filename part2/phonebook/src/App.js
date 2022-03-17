import { useState } from 'react'

const Info = (props) => <li>{props.name} / {props.phone}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '415-230-7789'},
  ]) 
  const [newPerson, setNewPerson] = useState(
    { name: '', phone: ''}
  )
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
      <div>
        <input 
          placeholder='search contacts'
          onChange={handleSearchChange}
        />
      </div>
      <h2>Add New:</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input 
            id="name"
            value={newPerson.name}
            onChange={handleFormChange}
          />
        </div>
        <div>
          phone: <input
            id="phone" 
            value={newPerson.phone}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map(person => <Info key={person.name} name={person.name} phone={person.phone}/>)}
      </ul>
    </div>
  )
}

export default App