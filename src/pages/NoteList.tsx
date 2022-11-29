import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactSelect from 'react-select';

import { Tag, Note } from '../App';
import NoteCard from '../components/NoteCard';
import EditTagsModal from '../components/EditTagsModal';

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

function NoteList ({ 
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
        selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))
    })
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button 
                variant="outline-secondary"
                onClick={setEditTagsModalIsOpen.bind(null, true)}
              >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className="mb-4">
        <Row>
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="tag">
            <Form.Label>Tag</Form.Label>
            <ReactSelect
              value={selectedTags?.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              options={availableTags?.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(
                  tags?.map(tag => {
                    return { label: tag.label, id: tag.value }
                  })
                )
              }}
              isMulti
            />
          </Form.Group>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal 
        show={editTagsModalIsOpen} 
        handleClose={() => setEditTagsModalIsOpen(false)} 
        availableTags={availableTags} 
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  )
}

export default NoteList;