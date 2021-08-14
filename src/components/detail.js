import React from "react";
// import { ButtonContainer } from "./styling";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { Button } from "react-bootstrap";

export default function Detail() {
  const { handleDetail, userState } = useProduct();
  const { detailProduct } = userState;
  console.log("the detail product is ", detailProduct);
  const {
    title,
    id,
    img,
    expectedPlace,
    priceRange,
    description,
    requestingParty,
  } = detailProduct;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-10 mx-auto  text-center text-slanted text-blue my-5">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3">
          <img src={img} alt="product" className="img-fluid" />
        </div>
        <div className="col-10 col-md-6 my-3 text-capitalize">
          {/* <h2>model:title</h2> */}
          {/* <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            company : <span className="text-uppercase">company</span>
          </h4> */}
          <h4 className="text-blue">
            <strong>Requested by? :{requestingParty.email}</strong>
          </h4>

          <p>How much S/he can pay? :{priceRange}</p>

          <p>Where Can You find it? :{expectedPlace}</p>

          <div className="container ">
            <p className="text-muted ">Description:{description}</p>
          </div>

          <div className="mt-auto">
            <Link to="/">
              <Button
                className="btn btn-secondary"
                style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
              >
                Back to home
              </Button>
            </Link>{" "}
            <Button
              style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
              cart
              // disabled={inCart ? true : false}
              onClick={() => {
                console.log("attach function to add to cart");
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
