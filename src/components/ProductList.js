import React from "react";
import Product from "./Product";
import Title from "./Title";
import { useProduct } from "./ProductContext";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export default function ProductList() {
  const { publicProducts } = useProduct();
  return (
    <div className="small-container">
      <h2>Available Requests</h2>
      <div className="row">
        {publicProducts.map(
          (eachProduct) =>
            !eachProduct.addedToCart && (
              <Product key={eachProduct.id} product={eachProduct} />
            )
        )}
      </div>
    </div>
  );

 
}
