export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
};

export type CartModalHandle = {
  open: () => void;
};
