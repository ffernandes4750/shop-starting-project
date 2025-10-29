import * as yup from "yup";

// Ajuda a converter "12,34" -> 12.34 e strings vazias -> NaN
const toNumber = (orig: unknown) => {
  if (typeof orig === "number") return orig;
  if (typeof orig === "string") {
    const trimmed = orig.trim();
    if (!trimmed) return NaN;
    const parsed = parseFloat(trimmed.replace(",", "."));
    return Number.isNaN(parsed) ? NaN : parsed;
  }
  return NaN;
};

export const newProductSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Min 3 characters")
    .max(100, "Max 100 characters"),
  price: yup
    .number()
    .transform((_val, orig) => toNumber(orig))
    .typeError("Price must be a number")
    .moreThan(0, "Price must be > 0")
    .required("Price is required"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(3, "Min 3 characters")
    .max(1000, "Max 1000 characters"),
});
export type NewProductSchema = yup.InferType<typeof newProductSchema>;
