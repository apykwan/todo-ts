import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Tag } from '../App';

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

function EditTagsModal({ 
  availableTags, 
  show, 
  handleClose,
  onUpdateTag,
  onDeleteTag 
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                  <Form.Group as={Col}>
                    <Form.Control 
                      type="text" 
                      value={tag.label} 
                      onChange={e => onUpdateTag(tag.id, e.target.value)}
                    />
                  </Form.Group>
                  <Col xs="auto">
                    <Button 
                      variant="outline-danger"
                      onClick={onDeleteTag.bind(null, tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditTagsModal;