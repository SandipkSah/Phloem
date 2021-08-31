import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { Button } from "react-bootstrap";
import "./css/Detail.css";

export default function Detail() {
  const { detailProduct, addToCart } = useProduct();
  console.log("the detail product is ", detailProduct);
  const {
    title,
    id,
    img,
    expectedPlace,
    priceRange,
    description,
    requestingParty,
    // addedToCart,
  } = detailProduct;
  const [yesAddedTocart, setYesAddedTocart] = useState(false);
  const changeText = async (id) => {
    setYesAddedTocart(true);
  };
  useEffect(() => {}, [setYesAddedTocart]);

  return (
    <div className="detail_container single_product">
      <div className="detail_row">
        <div className="column-2">
          <img
            src={
              img === ""
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png"
                : img
            }
            width="100%"
          />
        </div>
        <div className="column-2">
          <h1>{title}</h1>
          <p>Requested by {requestingParty.email}</p>
          <h4>Expected Price: {priceRange}</h4>
          <Link to="/">
            <Button
              className="btn btn-info"
              style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
            >
              Back to home
            </Button>
          </Link>
          {!yesAddedTocart ? (
            <Button
              className="btn btn-success"
              style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
              onClick={() => {
                addToCart(id);
                changeText(id);
                // window.location.reload()
              }}
            >
              Fulfill Request
            </Button>
          ) : (
            <Button
              style={{
                margin: "1rem",
                padding: "1rem",
                borderRadius: "40%",
                backgroundColor: "grey",
              }}
              disabled
            >
              Request Accepted
            </Button>
          )}
          <h3>Product Detail</h3>
          <p>{description === "" ? "No description given" : description}</p>
          <br />
          <br />
          <h5>Expected Place of finding</h5>
          <p>
            {expectedPlace === "" ? "No expectedPlace given" : expectedPlace}
          </p>
        </div>
      </div>
    </div>
  );
}
