import React from "react";
import CartItem from "./CartItem";



export default function CartList(props) {
    const {addedProducts} = props;
    return (
        <div className="container-fluid ">
          {console.log("added productsssssssssssss", addedProducts)}
          {addedProducts?.map(item => {
            console.log("\\\\\\\\|||||||||||||||||||", item)
            return <CartItem key={item.id} item={item} value={addedProducts} />;
          })}
        </div>
      );
}
