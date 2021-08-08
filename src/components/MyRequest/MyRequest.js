import React from "react";
import Title from "../Title";
// import CartColumns from "./CartColumns";
// import EmptyCart from "./EmptyCart";
// import { ProductConsumer } from "../context";
// import CartList from './CartList';
// import CartTotals from './CartTotals'

import CartColumn from './CartColumn'
import { ProductConsumer, useProduct } from "../ProductContext";

export default function MyRequest() {
  const { productState } = useProduct();
  const { products } = productState;
  const carts = products

  return (
    <div>
      <div>
        {!carts.length ? (
          <div>
            <h1>The cart is empty</h1>
          </div>
        ) : (
          <div>
            <Title name="My" title="Request" />
            <CartColumn/>
            <h1>here are cart column</h1>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <ProductConsumer>
{(value) => {
  const { cart } = value;
  if (cart.length > 0) {
    return (
      <React.Fragment>
        <Title name="Your" title="cart" />
        <CartColumns />
        <CartList value={value}/>
        <CartTotals value ={value} />
      </React.Fragment>
    );
  } else {
    return (
        <EmptyCart />
    );
  }
}}
</ProductConsumer> */
}
