import React from "react";
import CartItem from "./CartItem";



export default function CartList(props) {
    const {passedCartArray, cartType} = props;
    return (
        <div className="container-fluid ">
          {passedCartArray?.map(item => {
            return <CartItem cartType={cartType} key={item.id} item={item} value={item} />;
          })}
        </div>
      );
}
