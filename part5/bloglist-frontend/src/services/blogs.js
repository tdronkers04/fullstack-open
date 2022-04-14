import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUserBlogs = (userId) => {
  const request = axios.get(`${baseUrl}/${userId}`)
  return request.then(response => response.data)
}

const createBlog = (newBlog) => {
  let authToken = JSON.parse(window.localStorage.getItem("loggedInUser"))["token"]
  const request = axios.post(baseUrl, newBlog, { 
    headers: {"Authorization" : `Bearer ${authToken}`}
  })
  return request.then(response => response.data)
}

const blogService = {
  getAll,
  getUserBlogs,
  createBlog
}

export default blogService