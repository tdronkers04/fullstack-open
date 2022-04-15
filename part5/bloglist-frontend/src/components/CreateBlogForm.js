import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <input type="text" value={newTitle} name="title" placeholder='title'
            onChange={handleTitleChange} required/>
        </div>
        <div>
          <input type="text" value={newAuthor} name="author" id="author" placeholder='author'
            onChange={handleAuthorChange} required/>
        </div>
        <div>
          <input type="text" value={newUrl} name="url" id="url" placeholder='url'
            onChange={handleUrlChange} required/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm