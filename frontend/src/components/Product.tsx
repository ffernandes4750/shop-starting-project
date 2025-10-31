import { Card, Button } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { addItem } from "../redux/slices/cartSlice.ts";

type ProductProps = {
  _id: string;
  name: string;
  price: number;
  description: string;
  onRemoveItem: (_id: string) => Promise<void>;
};

export default function Product({
  _id,
  name,
  price,
  description,
  onRemoveItem,
}: ProductProps) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.auth.user);
  const isAdmin = user?.role == "admin";

  async function handleRemove(_id: string) {
    await onRemoveItem(_id);
    await queryClient.refetchQueries({ queryKey: ["products"] });
  }

  return (
    <Card className="h-100 shadow-soft rounded-soft">
      <Card.Body className="d-flex flex-column">
        <div className="mb-3">
          <Card.Title>{name}</Card.Title>
          <div className="text-muted mb-2">€{price.toFixed(2)}</div>
          <Card.Text>{description}</Card.Text>
        </div>
        <div className="mt-auto d-flex gap-2">
          {isAdmin && (
            <Button variant="outline-danger" onClick={() => handleRemove(_id)}>
              Remove
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => dispatch(addItem({ _id, name, price }))}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
