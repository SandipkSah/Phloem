import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function NavbarCustom() {
  const history = useHistory();
  const handleSubmitNewRequest = () => {
    history.push("/addrequests");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Phloem</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          {/* <Nav.Link href="#action1">Home</Nav.Link> */}
          <Nav.Link href="#action2">Your Requests</Nav.Link>
          <Nav.Link onClick={()=>handleSubmitNewRequest()}>New Requests</Nav.Link>

          <Nav.Link href="#" disabled>
            Link
          </Nav.Link>
        </Nav>

        <Form className="d-flex search_button">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
