import React from "react";
import CartItem from "./CartItem";



export default function CartList(props) {
    const {carts} = props;
    return (
        <div className="container-fluid ">
          {carts.map(item => {
            return <CartItem key={item.id} item={item} value={carts} />;
          })}
        </div>
      );
}
