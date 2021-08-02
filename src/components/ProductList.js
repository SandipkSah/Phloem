import React, { useContext } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer, useProduct } from "./ProductContext";


export default function ProductList() {
  const { productState } = useProduct();
  console.log(productState);
  return (
    <div className="py-5">
      <div className="container">
        <Title name="" title="Product Request" />
        <div className="row">
          {productState.products.map((eachProduct) => (
            <Product key={eachProduct.id} product={eachProduct} />
          ))}
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  );
}
