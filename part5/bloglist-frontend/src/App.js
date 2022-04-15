import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState({type: null, message: null})

  const formRef = useRef()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])
  
  useEffect(() => {
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
      setNotification({
        type: "success",
        message: "successful login operation!"
      })
      setTimeout(() => {
        setNotification({type: null, message: null})
      }, 5000)
    } catch (error) {
      console.error(error.message)
      setNotification({
        type: "error",
        message: "incorrect username or password"
      })
      setTimeout(() => {
        setNotification({type: null, message: null})
      }, 5000)
    }
  }

  const handleCreate = async (blogObject) => {
    try {
      const result = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(result))
      formRef.current.toggleVisibility()
      setNotification({
        type: "success",
        message: "new blog successfully saved!"
      })
      setTimeout(() => {
        setNotification({type: null, message: null})
      }, 5000)
    } catch (error) {
      console.error(error.message)
      setNotification({
        type: "error",
        message: "somethig went wrong. Please try again later"
      })
      setTimeout(() => {
        setNotification({type: null, message: null})
      }, 5000)
    }
  }

  const handleLike = async (blogObj) => {
    try {
      const result = await blogService.likeBlog(blogObj)
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === result.id) {
          return result
        } else {
          return blog
        }
      })
      setBlogs(updatedBlogs)
    } catch(error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (blogId) => {
    try {
      let confirm = window.confirm("Are you sure you want to delete this blog?")
      if (confirm) {
        const result = await blogService.deleteBlog(blogId)
        if (result === 204) {
          setBlogs(blogs.filter(blog => blog.id !== blogId))
          setNotification({
            type: "success",
            message: "blog successfully deleted"
          })
          setTimeout(() => {
            setNotification({type: null, message: null})
          }, 5000)
        }
      }
    } catch(error) {
      console.error(error.message)
      setNotification({
        type: "error",
        message: "somethig went wrong. Please try again later"
      })
      setTimeout(() => {
        setNotification({type: null, message: null})
      }, 5000)
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
        <Notification notification={notification} />
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
      <Notification notification={notification} />
      <div>
        <h4>{user.username} logged in
        <button onClick={handleLogout}>logout</button>
        </h4>
      </div>
      <div>
        <Toggleable buttonLabel='new blog' ref={formRef}>
          <CreateBlogForm createBlog={handleCreate}/>
        </Toggleable>
      </div>
      <br></br>
      <div>
        {blogs ? 
          blogs.sort((a, b) => a.likes < b.likes)
            .map(blog => <Blog key={blog.id} blog={blog} putLike={handleLike} deleteBlog={handleDelete}/>) 
          : null}
      </div>
    </div>
  )
}

export default App
