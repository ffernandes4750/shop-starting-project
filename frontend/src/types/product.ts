export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

export type NewProductType = {
  name: string;
  price: number;
  description: string;
};

export type AddProductModalHandle = {
  open: () => void;
};
