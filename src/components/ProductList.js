import React, { useContext } from "react";
import Product from "./Product";
import Title from "./Title";
import { useProduct } from "./ProductContext";

export default function ProductList() {
  const { publicProducts } = useProduct();
  // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk", publicProducts);
  return (
    <div className="py-5">
      <div className="container">
        <Title name="" title="Product Request" />
        <div className="row">
          {/* {console.log("iiiiiiiiiiiiiiiiiiiiiiii", publicProducts)} */}

          {publicProducts.map((eachProduct) => (
            <Product key={eachProduct.id} product={eachProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
