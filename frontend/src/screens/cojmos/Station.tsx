import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
type StationProps = {
  id: string;
  name: string;
  description: string;
};

export default function Station({ id, name, description }: StationProps) {
  const navigate = useNavigate();
  return (
    <Card className="h-100 shadow-soft rounded-soft">
      <Card.Body className="d-flex flex-column">
        <div className="mb-3">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </div>
        <div className="mt-auto d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/cojmos/station/${id}`)}
          >
            Ver Detalhes
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
