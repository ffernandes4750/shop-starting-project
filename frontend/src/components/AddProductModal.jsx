import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const AddProductModal = forwardRef(function Modal({ onAddProduct }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  const newProduct = useRef({
    id: "",
    title: "",
    price: 0,
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "price") {
      newProduct.current[name] = parseFloat(value.replace(",", "."));
      return;
    }
    newProduct.current[name] = value;
  }

  function handleSubmit() {
    onAddProduct({ ...newProduct.current }); 
    dialog.current.close();
  }

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>Add New Product</h2>
      <form id="add-product-form" onSubmit={handleSubmit}>
        <label>
            ID: <input type="text" name="id" required onChange={handleChange}/>
        </label>
        <label>
          Title: <input type="text" name="title" required onChange={handleChange}/>
        </label>
        <label>
          Price: <input type="text" name="price" required onChange={handleChange}/>
        </label>
        <label>
          Description: <textarea name="description" required onChange={handleChange}></textarea>
        </label>
        <menu id="modal-actions">
          <button type="button" onClick={() => dialog.current.close()}>
            Cancel
          </button>
          <button type="submit">Add Product</button>
        </menu>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default AddProductModal;
