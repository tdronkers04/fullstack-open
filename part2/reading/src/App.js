import './App.css';
import { useState } from 'react';
import Note from './components/Note';

const App = (props) => {
  const [ notes, setNotes ] = useState(props.notes);
  const [ newNote, setNewNote ] = useState('');
  const [ showAll, setShowAll ] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObj = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toLocaleDateString(),
      important: Math.random() < 0.5
    }
    setNotes(notes.concat(noteObj));
    setNewNote('');
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
          return <Note key={note.id} note={note}/>
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
