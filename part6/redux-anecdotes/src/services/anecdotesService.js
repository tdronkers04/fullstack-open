import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postAnecdote = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const putVote = async (id, obj) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj)
  return response.data
}

const services = {
  getAll,
  postAnecdote,
  putVote
}

export default services