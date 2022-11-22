import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import CreatableReactSelect from 'react-select/creatable';

import { NoteData, Tag } from '../App';
import styles from './NoteForm.module.css';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  
  function handleSubmit (e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: []
    });
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Form.Group as={Col} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
            <Form.Group as={Col} controlId="tag">
              <Form.Label>Tag</Form.Label>
              <CreatableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control 
            ref={markDownRef} 
            className={styles.textarea} 
            as="textarea" 
            rows={15} 
            required 
          />
        </Form.Group>
        <Stack className="justify-content-end" direction="horizontal" gap={2}>
          <Button type="submit">Save</Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm;