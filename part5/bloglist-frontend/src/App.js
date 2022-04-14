import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      // blogService.setToken(user.token) // method not yet implemented!
    }
  }, [])
  
  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // ) 
    if (user) {
      blogService.getUserBlogs(user.id).then(blogs => {
        setBlogs(blogs)
      }) 
    }
    
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const result = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(result))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username: 
              <input type="text" value={username} name="Username" 
                onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password: 
              <input type="password" value={password} name="Password" 
                onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <h4>{user.username} logged in
        <button onClick={handleLogout}>logout</button>
        </h4>
      </div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
          <div>
            title: 
              <input type="text" value={newTitle} name="title" 
                onChange={({ target }) => setNewTitle(target.value)} required/>
          </div>
          <div>
            author: 
              <input type="text" value={newAuthor} name="author" 
                onChange={({ target }) => setNewAuthor(target.value)} required/>
          </div>
          <div>
            url:  
              <input type="text" value={newUrl} name="url" 
                onChange={({ target }) => setNewUrl(target.value)} required/>
          </div>
          <button type="submit">create</button>
        </form>
        <br></br>
       {blogs ? blogs.map(blog => <Blog key={blog.id} blog={blog}/>) : null}
    </div>
  )
}

export default App
