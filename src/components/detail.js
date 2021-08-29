import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { Button } from "react-bootstrap";
import { db } from "../firebase";

export default function Detail() {
  const { detailProduct, addToCart } = useProduct();
  //const { detailProduct } = userState;
  console.log("the detail product is ", detailProduct);
  const {
    title,
    id,
    img,
    expectedPlace,
    priceRange,
    description,
    requestingParty,
    addedToCart,
  } = detailProduct;
  const [yesAddedTocart, setYesAddedTocart] = useState(false);
  const changeText = async (id) => {
    console.log("///", id);
    await db
      .collection("public_posts")
      .doc(id)
      .get()
      .then((doc) => {
        console.log("///", doc.data());
        if (doc.data().addedToCart) {
          setYesAddedTocart(true);
          console.log("yes added");
        } else {
          setYesAddedTocart(false);
        }
      });
  };
  useEffect(() => {
    console.log("running useEffect of detail");
  }, [setYesAddedTocart]);
  return (
    <div className="container py-5">
      {console.log("added to Cart", addedToCart)}
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
            {!yesAddedTocart ? (
              <Button
                style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
                onClick={() => {
                  addToCart(id);
                  changeText(id);
                  // window.location.reload()
                }}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                style={{
                  margin: "1rem",
                  padding: "1rem",
                  borderRadius: "40%",
                  color: "grey",
                }}
                disabled
              >
                ---------------
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
