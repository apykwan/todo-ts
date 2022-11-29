import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';

import { useNote } from '../routes/NoteLayout';

type NoteProps = {
  onDeleteNote: (id: string) => void;
}

function Note({ onDeleteNote }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-item-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button 
              variant="outline-danger"
              onClick={onDeleteNote.bind(null, note.id)}
            >
              Delete
            </Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}

export default Note;