export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartType = {
  items: CartItem[];
};
