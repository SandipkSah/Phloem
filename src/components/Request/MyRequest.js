import React from "react";
import Title from "../Title";
import Navbar from "../Navbar";
import CartHeaderColumn from "./AddedRequestHeader";
import AcceptedRequestHeader from "./AddedRequestHeader";
import { Button, Card } from "react-bootstrap";
import { useProduct } from "../ProductContext";
import CartList from "./CartList";
import { useHistory } from "react-router";

export default function MyRequest() {
  const { userState } = useProduct();
  const { addedProducts, cartOfUser } = userState;

  const history = useHistory();

  const handleButtonClickAdded = () => {
    history.push("/addrequests");
  };

  const handleButtonClickAccepted = () => {
    history.push("/");
  };

  return (
    <div>
      <Navbar />
      <div>
        <Title name="Added" title="Requests" />
        {!addedProducts?.length ? (
          <div>
            <Card
              className="container text-center"
              style={{ marginTop: "auto", padding: "2rem" }}
            >
              <p>You have not added any Request</p>
              <p>Please Go to Add Request to add</p>
              <Button
                className="m-auto"
                variant="primary"
                onClick={() => {
                  handleButtonClickAdded();
                }}
              >
                Add request
              </Button>
            </Card>
          </div>
        ) : (
          <div>
            <CartHeaderColumn />
            <CartList cartType="added" passedCartArray={addedProducts} />
          </div>
        )}
        <Title name="" title="Requests in Cart" />
        {!cartOfUser?.length ? (
          <div>
            <Card
              className="container text-center"
              style={{ marginTop: "auto", padding: "2rem" }}
            >
              <p>You have not added any Request to Cart</p>
              <p>Please Go to Product List to add to cart</p>
              <Button
                className="m-auto"
                variant="primary"
                onClick={() => {
                  handleButtonClickAccepted();
                }}
              >
                Product List
              </Button>
            </Card>
          </div>
        ) : (
          <div>
            <AcceptedRequestHeader />
            <CartList cartType="inCart" passedCartArray={cartOfUser} />
          </div>
        )}
      </div>
    </div>
  );
}
