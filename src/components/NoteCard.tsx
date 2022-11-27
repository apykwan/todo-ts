import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

import { Tag } from '../App';
import styles from './NoteCard.module.css';

interface NoteCardProps {
  id: string;
  title: string;
  tags: Tag[];
}

function NoteCard ({ id, title, tags }: NoteCardProps) {
  return (
    <Card 
      as={Link} 
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
              {tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )

}

export default NoteCard;