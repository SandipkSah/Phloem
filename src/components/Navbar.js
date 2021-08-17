import React, { useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Alert, Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../contexts/AuthContext";
import { useProduct } from "./ProductContext";

export default function NavbarCustom() {
  const { logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUserLoginInfo } = useProduct();


  const handleSubmitNewRequest = () => {
    history.push("/addrequests");
  };

  const handleSubmitMyRequest = () => {
    history.push("/myrequests");
  };

  const handleSubmitPhloem = () => {
    history.push("/");
  };

  const handleLogout = async () => {
    console.log("to be logged out");
    try {
      setError("");
      setLoading(true);
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand
          onClick={() => handleSubmitPhloem()}
          className="button_comp"
          disabled={loading}
        >
          Phloem
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={() => handleSubmitMyRequest()}
              className="button_comp"
              disabled={loading}
            >
              Requests
            </Nav.Link>
            <Nav.Link
              onClick={() => handleSubmitNewRequest()}
              className="button_comp"
              disabled={loading}
            >
              Add Requests
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
          <p>{getUserLoginInfo()}</p>
          <Nav.Link
            onClick={() => {
              handleLogout();
            }}
            className="button_comp"
          >
            <ExitToAppIcon />
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      {error && (
        <Alert variant="danger" style={{ textAlign: "center", margin: "auto" }}>
          {error}
        </Alert>
      )}
    </>
  );
}
