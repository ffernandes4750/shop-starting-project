import { forwardRef, useImperativeHandle, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, useFormState } from "react-hook-form";

import type {
  NewProductType,
  AddProductModalHandle,
} from "../types/product.ts";

type AddProductModalProps = {
  onAddProduct: (product: NewProductType) => Promise<unknown>;
};

const AddProductModal = forwardRef<AddProductModalHandle, AddProductModalProps>(
  function Modal({ onAddProduct }, ref) {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const queryClient = useQueryClient();

    // ---------------- React Hook Form ----------------
    const { register, handleSubmit, reset, control } = useForm<NewProductType>({
      defaultValues: {
        name: "",
        price: 0,
        description: "",
      },
      mode: "onSubmit",
    });

    // Lê só partes do formState (evita re-renders desnecessários)
    const { errors, isSubmitting } = useFormState({ control });

    useImperativeHandle(
      ref,
      () => ({
        open() {
          reset({
            name: "",
            price: 0,
            description: "",
          });
          dialog.current?.showModal();
        },
      }),
      [reset]
    );

    const closeDialog = useCallback(() => {
      dialog.current?.close();
      reset({
        name: "",
        price: 0,
        description: "",
      });
    }, [reset]);

    const onSubmit = useCallback(
      async (data: NewProductType) => {
        await onAddProduct(data);
        await queryClient.refetchQueries({ queryKey: ["products"] });
        closeDialog();
      },
      [onAddProduct, queryClient, closeDialog]
    );

    return createPortal(
      <dialog id="modal" ref={dialog}>
        <h2>Add New Product</h2>

        <form id="add-product-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name:{" "}
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
            />
          </label>
          {errors.name && <span>{errors.name.message}</span>}

          <label>
            Price:{" "}
            <input
              type="text"
              // Aceita vírgulas e converte para número
              {...register("price", {
                required: "Price is required",
                setValueAs: (v) => {
                  if (typeof v === "number") return v;
                  const parsed = parseFloat(String(v).replace(",", "."));
                  return Number.isNaN(parsed) ? 0 : parsed;
                },
                validate: (v) =>
                  (typeof v === "number" && v > 0) || "Price must be > 0",
              })}
              placeholder="0.00"
            />
          </label>
          {errors.price && <span>{errors.price.message as string}</span>}

          <label>
            Description:{" "}
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
            />
          </label>
          {errors.description && <span>{errors.description.message}</span>}

          <menu id="modal-actions">
            <button type="button" onClick={closeDialog}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </menu>
        </form>
      </dialog>,
      document.getElementById("modal") as HTMLElement // garante que não é null
    );
  }
);

export default AddProductModal;
