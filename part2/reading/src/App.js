import './App.css';
import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes'

const App = () => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote).then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote))
      })
      .catch(error => {
        alert(`the note ${note.content} does not exist on the server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }
  
  const addNote = (event) => {
    event.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toLocaleDateString(),
      important: Math.random() < 0.5
    }
    
    noteService.create(noteObj).then(newNote => {
      setNotes(notes.concat(newNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => {
          return <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        })}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
          />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;
