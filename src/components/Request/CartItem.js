import React from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CartItem({ item, value }) {
  const { id, title, img, priceRange, total} = item;

  console.log(
    "data to be included in Cart is expected Place:",
    total
  );

  const { removeItem } = value;
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
        <div className="cart-icon" onClick={() => removeItem(id)}>
          <IconButton aria-label="delete" style={{"color":"#dab057"}}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {/* <div className="col-10 mx-auto col-lg-2">
        <strong>item total : $ {priceRange}</strong>
      </div> */}
    </div>
  );
}
