import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

import AddProductModal from "./modals/AddProductModal.tsx";
import Product from "./Product.tsx";
import { useAppSelector } from "../redux/hooks.ts";

import type { ProductType, NewProductType } from "../types/product.ts";

type ShopProps = {
  products: ProductType[];
  onAddProduct: (product: NewProductType) => Promise<ProductType>;
  onRemoveItem: (_id: string) => Promise<void>;
};

export default function Shop({
  products,
  onAddProduct,
  onRemoveItem,
}: ShopProps) {
  const [showAdd, setShowAdd] = useState(false);

  const user = useAppSelector((s) => s.auth.user);
  const isAdmin = user?.role == "admin";

  return (
    <>
      <AddProductModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onAddProduct={onAddProduct}
      />

      <section id="shop" className="py-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 m-0">Elegant Clothing For Everyone</h2>
            {isAdmin && (
              <Button onClick={() => setShowAdd(true)}>Add Product</Button>
            )}
          </div>

          <Row xs={1} md={2} lg={3} className="g-4">
            {products.map((p) => (
              <Col key={p._id}>
                <Product {...p} onRemoveItem={onRemoveItem} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
