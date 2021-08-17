import React from "react";
import Product from "./Product";
import Title from "./Title";
import { useProduct } from "./ProductContext";

export default function ProductList() {
  const { publicProducts } = useProduct();
  return (
    <div className="py-5">
      <div className="container">
        <Title name="Available" title="Request" />
        <div className="row" style={{ margin: "auto" }}>
          {publicProducts.map(
            (eachProduct) =>
              !eachProduct.addedToCart && (
                <Product key={eachProduct.id} product={eachProduct} />
              )
          )}
        </div>
      </div>
    </div>
  );
}
