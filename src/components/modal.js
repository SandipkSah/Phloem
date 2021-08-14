import React from "react";
// import styled from "styled-components";
// import { ProductConsumer } from "../components/context";
import { ButtonContainer, ModalContainer } from "./styling";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

export default function Modal() {
  const { openModal, closeModal } = useProduct();

  console.log("useProddddddddddddd", useProduct)
  return (
    <ModalContainer>
      <div className="container">
        <div className="row">
          <div
            id="modal"
            className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
          >
            <h3>Item to added to Cart</h3>
            {/* <img src={img} className="img-fluid" alt="product" /> */}
            <img src="{img}" className="img-fluid" alt="product" />
            {/* <h5>{title}</h5> */}

            <h5>title</h5>
            <h5 className="text-muted">price : $ price</h5>
            {/* <h5 className="text-muted">price : $ {price}</h5> */}
            <Link to="/">
              <ButtonContainer
                onClick={() => console.log("implement close modal")}
              >
                Continue shopping
              </ButtonContainer>
            </Link>
            <Link to="/myrequests">
              <ButtonContainer
                onClick={() => console.log("implement open modal")}
                cart
              >
                GO to Cart
              </ButtonContainer>
            </Link>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
