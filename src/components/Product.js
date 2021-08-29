import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export default function Product(props) {
  const { handleDetail, addToCart } = useProduct();

  const { title, id, img, priceRange } = props.product;

  return (
    <div
      className="col-4"
      onClick={() => {
        handleDetail(id);
      }}
    >
      <Link to="/detail">
        <img src={img} alt="img" className="imgframe"/>
      </Link>
      <h4 >{title}</h4>
      <p>{priceRange}</p>
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
