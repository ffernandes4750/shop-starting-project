export type ProductType = {
  _id: string;
  title: string;
  price: number;
  description: string;
};

export type NewProductType = {
  title: string;
  price: number;
  description: string;
};

export type AddProductModalHandle = {
  open: () => void;
};
