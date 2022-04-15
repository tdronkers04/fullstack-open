import { useState } from "react"

const Blog = ({ blog, putLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    background: '#F0FFFF'
  }

  const [ visible, setVisible ] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    blog.likes += 1
    putLike(blog)
  }

  const deleteRecord = () => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>
          {blog.title}
          <button onClick={toggleVisibility}>view</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
        </p>
        <ul>
          <li>Author: {blog.author}</li>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={addLike}>like</button></li>
        </ul>
        <button onClick={deleteRecord}>delete</button>
      </div>
    </div>
  )
}

export default Blog