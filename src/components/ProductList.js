import React from "react";
import Product from "./Product";
import { useProduct } from "./ProductContext";

export default function ProductList() {
  const { publicProducts, searchString } = useProduct();
  const newpublicProducts = publicProducts.filter((eachProduct) =>
    eachProduct.title.toLowerCase().includes(searchString)
  );

  return (
    <div className="product_list-container">
      <h2>Available Requests</h2>
      <div className="row">
        {/* {publicProducts.map( */}
        {newpublicProducts.map(
          (eachProduct) =>
            !eachProduct.addedToCart && (
              <Product key={eachProduct.id} product={eachProduct} />
            )
        )}
      </div>
    </div>
  );
}
