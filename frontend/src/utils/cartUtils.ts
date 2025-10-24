import type { ProductType } from "../types/product.ts";
import type { CartItem, Cart } from "../types/cart.ts";

/**
 * Adiciona um produto ao carrinho.
 * Se o produto já existir, aumenta a quantidade.
 */
export function addItemToCart(
  _id: string,
  prevShoppingCart: Cart,
  products: ProductType[]
): Cart {
  // 1. Em vez de findIndex, usamos find para obter o item diretamente.
  const existingCartItem = prevShoppingCart.items.find(
    (cartItem) => cartItem._id === _id
  );

  if (existingCartItem) {
    // 2. Se existe, usamos .map() para criar uma NOVA array.
    // Quando encontramos o item, retornamos uma cópia dele com a quantidade atualizada.
    const updatedItems = prevShoppingCart.items.map((item) =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    return { items: updatedItems };
  } else {
    // 3. Se não existe, encontramos o produto.
    const product = products.find((product) => product._id === _id);
    if (!product) {
      throw new Error(`Produto com id "${_id}" não encontrado.`);
    }

    // 4. Criamos o novo item de carrinho.
    const newItem: CartItem = {
      _id: product._id,
      name: product.title,
      price: product.price,
      quantity: 1,
    };

    // 5. Retornamos uma NOVA array com o item antigo + o novo item.
    return { items: [...prevShoppingCart.items, newItem] };
  }
}

/**
 * Atualiza a quantidade de um produto no carrinho.
 * Se a quantidade ficar <= 0, remove o item.
 */
export function updateCartItemQuantity(
  productId: string,
  amount: number,
  prevShoppingCart: Cart
): Cart {
  // 1. Encontramos o item que queremos atualizar.
  const existingItem = prevShoppingCart.items.find(
    (item) => item._id === productId
  );

  // Se o item não for encontrado, retornamos o estado original.
  if (!existingItem) {
    return prevShoppingCart;
  }

  // 2. Calculamos a nova quantidade.
  const newQuantity = existingItem.quantity + amount;

  if (newQuantity <= 0) {
    // 3. Se a quantidade for <= 0, usamos .filter() para criar uma NOVA array
    // que contém todos os itens, *exceto* aquele que queremos remover.
    const updatedItems = prevShoppingCart.items.filter(
      (item) => item._id !== productId
    );
    return { items: updatedItems };
  } else {
    // 4. Se a quantidade for > 0, usamos .map() para criar uma NOVA array
    // e atualizamos a quantidade do item correspondente.
    const updatedItems = prevShoppingCart.items.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    return { items: updatedItems };
  }
}
