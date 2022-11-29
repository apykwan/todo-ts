import { useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { v4 as uuidV4 } from 'uuid';

import useLocalStorage from './hooks/useLocalStorage';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import NoteList from './pages/NoteList';
import Note from './pages/Note';
import { NoteLayout } from './routes/NoteLayout';

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

  function onUpdate(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNote => {
      return prevNote.map(note => {
          if (note.id === id) {
            return {
              ...note, ...data, tagIds: tags.map(tag => tag.id)
            }
          } else {
            return note;
          }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }

  function onAddTag(tag: Tag) {
    setTags(prev =>[...prev, tag]);
  }

  function onUpdateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function onDeleteTag(id: string) {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route 
          path="/" 
          element={<NoteList 
            availableTags={tags} 
            notes={notesWithTags} 
            onUpdateTag={onUpdateTag}
            onDeleteTag={onDeleteTag}
          />} 
        />
        <Route 
          path="/new" 
          element={<NewNote 
            onSubmit={onCreateNote} 
            onAddTag={onAddTag}
            availableTags={tags}
          />} 
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<EditNote 
            onSubmit={onUpdate} 
            onAddTag={onAddTag}
            availableTags={tags}
          />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
