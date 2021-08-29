import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export default function Product(props) {
  const { handleDetail, addToCart } = useProduct();
  // console.log("history is ", props);

  const { title, id, img, priceRange } = props.product;
  const imgToShow =
    img ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png";

  return (
    <div
      className="col-4"
      onClick={() => {
        handleDetail(id);
      }}
    >
      <Link to="/detail">
        <img src={imgToShow} alt="img" className="imgframe" />
      </Link>
      <div className="border border-success single_product_child">
        <h4>{title}</h4>
        <p>{priceRange}</p>
      </div>
      <Link to="/detail">
        <button
          className="view_detail-button"
          onClick={() => {
            // history.push("/");
            console.log("implement here");
          }}
        >
          View Detail
        </button>
      </Link>

      <button
        className="cart-button"
        onClick={() => {
          addToCart(id);
        }}
      >
        <AddShoppingCartIcon />
      </button>
    </div>
  );
}
