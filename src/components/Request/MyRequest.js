import React from "react";
import Title from "../Title";
import Navbar from "../Navbar";
import CartColumn from "./CartColumn";
import { useProduct } from "../ProductContext";
import CartList from "./CartList";

export default function MyRequest() {
  const { publicProducts } = useProduct();
  const carts = publicProducts;
  return (
    <div>
      <Navbar />
      {console.log("the carts details are ----------",carts)}
      <div>
        {!carts.length ? (
          <div>
            <h1>The cart is empty</h1>
          </div>
        ) : (
          <div>
            <Title name="My" title="Request" />
            <CartColumn />
            <CartList carts={carts}/>
          </div>
        )}
        {!carts.length ? (
          <div>
            <h1>The cart is empty</h1>
          </div>
        ) : (
          <div>
            <Title name="Accepted" title="Requests" />
            <CartColumn />
            <CartList carts={carts}/>
          </div>
        )}
      </div>
    </div>
  );
}
