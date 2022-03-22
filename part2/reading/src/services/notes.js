import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  let request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'hello world 123456',
    date: 'x',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = (newObject) => {
  let request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  let request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const noteService = {getAll, create, update}

export default noteService