export default function Product({
  _id,
  title,
  price,
  description,
  onAddToCart,
  removeItem,
}) {
  return (
    <article className="product">
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button id="remove-product-button" onClick={() => removeItem(_id)}>
            Remove
          </button>
          <button onClick={() => onAddToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
