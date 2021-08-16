import React,{useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useProduct } from "../ProductContext";

export default function CartItem({ item, value, cartType }) {
  const { id, title, img, priceRange, total } = item;
  const { removeItemFromCart, removeItemFromAdded } = useProduct();
  const [invoke, setInvoke] = useState(false);

  //useEffect(() => {}, [invoke]);

  console.log("from cart ITem the cart type is ", cartType);

  console.log(removeItemFromCart, "and", removeItemFromAdded);

  return (
    <div className="row my-1 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">Product : </span> {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price : </span> {priceRange}
      </div>

      <div className="col-10 mx-auto col-lg-2">
        <div
          className="cart-icon"
          onClick={() => {
            cartType === "added"
              ? removeItemFromAdded(id)
              : removeItemFromCart(item);
              setInvoke(!invoke)
            console.log("impement function here");
          }}
        >
          <IconButton aria-label="delete" style={{ color: "#dab057" }}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
