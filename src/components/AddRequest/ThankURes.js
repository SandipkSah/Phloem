// import { Button } from "bootstrap";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";

export default function ThankURes() {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/");
  };
  return (
    <div >
      <Card className="container text-center" style={{"marginTop":"30vh", "padding":"2rem"}}>
        <p>Thank you!!!</p>
        <p>Your post has been added</p>
        <Button
        className="m-auto"
          variant="primary"
          onClick={() => {
            handleButtonClick();
          }}
          
        >
          Return to Homepage
        </Button>
      </Card>
    </div>
  );
}
