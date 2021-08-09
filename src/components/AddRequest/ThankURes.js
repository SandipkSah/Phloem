import { Button } from "bootstrap";
import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";

export default function ThankURes() {
    const history = useHistory()
  return (
    <div>
      <Card>
        <p>Thank you!!!</p>
        <p>Your post has been added</p>
        <Button onClick={()=>{
            history.push('/')
        }}>Click to return</Button>
      </Card>
    </div>
  );
}
