// import { useState } from "react";

const CreateBlogForm = ({
  handleSubmit,
  handleNewTitle,
  handleNewAuthor,
  handleNewUrl,
  newTitle,
  newAuthor,
  newUrl
}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: 
          <input type="text" value={newTitle} name="title" 
            onChange={handleNewTitle} required/>
         </div>
         <div>
          author: 
          <input type="text" value={newAuthor} name="author" 
            onChange={handleNewAuthor} required/>
        </div>
        <div>
          url:  
            <input type="text" value={newUrl} name="url" 
              onChange={handleNewUrl} required/>
          </div>
          <button type="submit">create</button>
      </form>
    </div>        
  )
}

export default CreateBlogForm