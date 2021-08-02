import React, { Component,useContext } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer, useProduct, ProductContext } from "./ProductContext";


function ProductList() {
  console.log(useProduct())
  console.log("fffffffffffff", ProductContext)
  // const { products } = useProduct();
  return (
    <div className="py-5">
      <div className="container">
        <Title name="" title="Product Request" />
        <div className="row">
          {/* <ProductConsumer>
            {(value) => {
              return products.product.map((product) => {
                return <Product key={product.id} product={product} />;
              });
            }}
          </ProductConsumer> */}
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

export default ProductList;
