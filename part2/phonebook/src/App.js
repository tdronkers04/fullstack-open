import { useEffect, useState } from 'react'
import AllNumbers from './components/Display'
import Search from './components/Search'
import Form from './components/Form'
import contacts from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({ name: '', phone: ''})
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    contacts
      .getAll()
      .then(contacts => setPersons(contacts))
      .catch(error => {
        console.log(error.message)
        alert('Something went wrong. Please try again later')
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault();
    let found = persons.findIndex(person => person.name === newPerson.name);

    if (found !== -1) {
      let contactId = persons[found].id;
      let answer = window.confirm(`${newPerson.name} already exists in the phonebook. Replace the old number with the new number?`)

      if (answer) {
        contacts
          .updateContact(contactId, newPerson)
          .then(updatedContact => {
            setPersons(persons.map(person => person.id !== contactId ? person : updatedContact))
            setNewPerson({ name: '', phone: ''})
          })
          .catch(error => {
            console.log(error.message)
            alert('Something went wrong. Please try again later')
          })
      }
      
    } else {
      contacts
        .create(newPerson)
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setNewPerson({ name: '', phone: ''})
        })
        .catch(error => {
          console.log(error.message)
          alert('Something went wrong. Please try again later')
        })
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

  const handleDelete = (event) => {
    const contactId = parseInt(event.target.parentElement.id);
    const contactName = persons.find(person => person.id === contactId).name
    let answer = window.confirm(`Are you sure you want to delete contact ${contactName}?`);
    
    if (answer) {
      contacts
        .deleteContact(contactId)
        .then(status => {
          if (status === 200) {
            setPersons(persons.filter(person => person.id !== contactId))
            alert(`${contactName} successfully delete`)
          }
        })
        .catch(error => {
          console.log(error.message)
          alert('Something went wrong. Please try again later')
        })
    }
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
      <AllNumbers contacts={contactsToShow} callback={handleDelete}/>
    </div>
  )
}

export default App