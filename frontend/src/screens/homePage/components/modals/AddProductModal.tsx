import { Modal, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  newProductSchema,
  type NewProductSchema,
} from "../../../../validation-yup/productSchemas.ts";

import type { ProductType } from "../../../../types/product.ts";

type AddProductModalProps = {
  show: boolean;
  onHide: () => void;
  onAddProduct: (product: NewProductSchema) => Promise<ProductType>;
};

export default function AddProductModal({
  show,
  onHide,
  onAddProduct,
}: AddProductModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<NewProductSchema>({
    defaultValues: { name: "", price: 0, description: "" },
    mode: "onSubmit",
    resolver: yupResolver(newProductSchema),
  });

  const close = useCallback(() => {
    onHide();
    reset({ name: "", price: 0, description: "" });
  }, [onHide, reset]);

  // ALTERAR PARA MUTATION
  const onSubmit = useCallback(
    async (data: NewProductSchema) => {
      try {
        await onAddProduct(data);
        await queryClient.refetchQueries({ queryKey: ["products"] });
        close();
      } catch (e: any) {
        setError("root", {
          type: "server",
          message: e?.message ?? "Erro ao adicionar produto",
        });
      }
    },
    [onAddProduct, queryClient, close, setError]
  );

  return (
    <Modal show={show} onHide={close} centered backdrop="static">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column gap-3">
          {errors.root?.message && (
            <div className="text-danger small">{errors.root.message}</div>
          )}

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              autoComplete="off"
              isInvalid={!!errors.name}
              {...register("name")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <InputGroup>
              <InputGroup.Text>€</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="0,00"
                inputMode="decimal"
                autoComplete="off"
                isInvalid={!!errors.price}
                {...register("price")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              isInvalid={!!errors.description}
              {...register("description")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            type="button"
            onClick={close}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner size="sm" className="me-2" /> Adding...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
