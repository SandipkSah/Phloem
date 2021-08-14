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
  //console.log(useProduct())
  const { userState } = useProduct();
  //console.log("sssssssssssssssssssss", userState)
  const { addedProducts, cartProducts } = userState;
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
      {console.log("the carts details are ----------", userState)}
      <div>
        {!addedProducts?.length ? (
          <div>
          <Card
            className="container text-center"
            style={{ marginTop: "30vh", "padding":"2rem" }} 
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
            <Title name="Added" title="Request" />
            <CartHeaderColumn />
            <CartList addedProducts={addedProducts} />
          </div>
        )}

        {!cartProducts?.length ? (
          <div>
            <Card
              className="container text-center"
              style={{ marginTop: "30vh", "padding":"2rem" }} 
            >
              <p>You have not accepted any Request</p>
              <p>Please Go to Product List to accept</p>
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
            <Title name="Accepted" title="Requests" />
            <AcceptedRequestHeader />
            <CartList carts={cartProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
