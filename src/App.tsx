import { useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { v4 as uuidV4 } from 'uuid';

import useLocalStorage from './hooks/useLocalStorage';
import NewNote from './pages/NewNote';

export type Note = {
  id: string;
} & NoteData

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[]
}

export type Tag = {
  id: string;
  label: string;
}

export type RawNote = {
  id: string;
} & RawNoteData

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(function() {
    return notes?.map(note => {
      return { 
        ...note, 
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    });
  }

  function onAddTag(tag: Tag) {
    setTags(prev =>[...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Hihi</h1>} />
        <Route 
          path="/new" 
          element={<NewNote 
            onSubmit={onCreateNote} 
            onAddTag={onAddTag}
            availableTags={tags}
          />} 
        />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App