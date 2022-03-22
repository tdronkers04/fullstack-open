import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  let request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newContact) => {
  let request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  let deleteUrl = `${baseUrl}/${id}`
  let request = axios.delete(deleteUrl)
  return request.then(response => response.status)
}

const updateContact = (id, newObj) => {
  let putUrl = `${baseUrl}/${id}`
  let request = axios.put(putUrl, newObj)
  return request.then(response => response.data)
}

const contacts = {getAll, create, deleteContact, updateContact}

export default contacts
