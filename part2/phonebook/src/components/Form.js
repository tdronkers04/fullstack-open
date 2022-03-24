import React from 'react'

const Form = ({ addContact, handleFormChange, newPerson }) => {
  return (
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
            value={newPerson.number}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form