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
  let authToken = JSON.parse(window.localStorage.getItem('loggedInUser'))['token']
  const request = axios.post(baseUrl, newBlog, {
    headers: { 'Authorization' : `Bearer ${authToken}` }
  })
  return request.then(response => response.data)
}

const likeBlog = (blogObj) => {
  let authToken = JSON.parse(window.localStorage.getItem('loggedInUser'))['token']
  const request = axios.put(
    `${baseUrl}/${blogObj.id}`,
    blogObj, {
      headers: { 'Authorization' : `Bearer ${authToken}` }
    })
  return request.then(response => response.data)
}

const deleteBlog = (blogId) => {
  let authToken = JSON.parse(window.localStorage.getItem('loggedInUser'))['token']
  const request = axios.delete(
    `${baseUrl}/${blogId}`, {
      headers: { 'Authorization' : `Bearer ${authToken}` }
    })
  return request.then(response => response.status)
}

const blogService = {
  getAll,
  getUserBlogs,
  createBlog,
  likeBlog,
  deleteBlog
}

export default blogService