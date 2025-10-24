import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import type {
  NewProductType,
  AddProductModalHandle,
} from "../types/product.ts";

// Tipo das props do modal
type AddProductModalProps = {
  onAddProduct: (product: NewProductType) => void;
};

// Componente principal com forwardRef
const AddProductModal = forwardRef<AddProductModalHandle, AddProductModalProps>(
  function Modal({ onAddProduct }, ref) {
    // O dialog HTML
    const dialog = useRef<HTMLDialogElement | null>(null);

    // Expor o método open() ao componente pai
    useImperativeHandle(ref, () => ({
      open() {
        dialog.current?.showModal();
      },
    }));

    // Objeto temporário do novo produto
    const newProduct = useRef<NewProductType>({
      title: "",
      price: 0,
      description: "",
    });

    // Atualizar campos do formulário
    function handleChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      const { name, value } = event.target;
      const key = name as keyof NewProductType;

      if (key === "price") {
        newProduct.current[key] = parseFloat(value.replace(",", "."));
      } else {
        newProduct.current[key] = value;
      }
    }

    // Submeter formulário
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      onAddProduct({ ...newProduct.current });
      dialog.current?.close();
    }

    // Criar portal do modal
    return createPortal(
      <dialog id="modal" ref={dialog}>
        <h2>Add New Product</h2>
        <form id="add-product-form" onSubmit={handleSubmit}>
          <label>
            Title:{" "}
            <input type="text" name="title" required onChange={handleChange} />
          </label>
          <label>
            Price:{" "}
            <input type="text" name="price" required onChange={handleChange} />
          </label>
          <label>
            Description:{" "}
            <textarea
              name="description"
              required
              onChange={handleChange}
            ></textarea>
          </label>
          <menu id="modal-actions">
            <button type="button" onClick={() => dialog.current?.close()}>
              Cancel
            </button>
            <button type="submit">Add Product</button>
          </menu>
        </form>
      </dialog>,
      document.getElementById("modal") as HTMLElement // garante que não é null
    );
  }
);

export default AddProductModal;
