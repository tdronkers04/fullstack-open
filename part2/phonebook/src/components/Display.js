import React from 'react';

const Info = ({ name, phone }) => <li>{name} / {phone}</li>
const AllNumbers = ({ contacts }) => {
  return (
    <ul>
      {
        contacts.map(contact => 
          <Info key={contact.name} name={contact.name} phone={contact.phone}/>)
      }
    </ul>
  )
}

export default AllNumbers