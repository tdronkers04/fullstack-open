import React from 'react';

const Delete = ({ callback }) => {
  return <button onClick={callback}>Delete</button>
}

const Info = ({ name, phone, id, callback }) => {
  return <li id={id}>{name} / {phone} <Delete callback={callback}/></li>
} 
const AllNumbers = ({ contacts, callback }) => {
  return (
    <ul>
      {
        contacts.map(contact => 
          <Info 
            key={contact.name}
            name={contact.name}
            phone={contact.phone}
            id={contact.id}
            callback={callback}
          />
        )
      }
    </ul>
  )
}

export default AllNumbers