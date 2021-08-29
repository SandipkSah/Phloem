import React, { useState, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Alert, Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../contexts/AuthContext";
import { useProduct } from "./ProductContext";
import firebase from "firebase";
import { YoutubeSearchedFor } from "@material-ui/icons";

export default function NavbarCustom() {
  const { logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSearchString, userEmail } = useProduct();
  const searchString = useRef("");

  const handleSubmitNewRequest = () => {
    history.push("/addrequests");
  };

  const handleSubmitMyRequest = () => {
    history.push("/myrequests");
  };

  const handleSubmitPhloem = () => {
    history.push("/");
  };

  const handleSearch = () => {
    // console.log("hhhhhhhhhh::::::", searchString.current.value);
    // console.log("enter hadndlllffl");
    // console.log("oooooooooooo",setSearchString(searchString.current.value))
    setSearchString(searchString.current.value);
    // console.log("the search param is ",searchString)
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
      <Navbar expand="lg" className="navbar_comp">
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

          {/* <Form className="d-flex search_button">
            <FormControl
              type="search"
              placeholder="Start typing...."
              className="mr-2"
              aria-label="Search"
              ref={searchString}
              onChange={() => {
                handleSearch();
              }}
            />
          </Form> */}
          <input
            type="search"
            placeholder="Start typing to search...."
            className="search_button"
            aria-label="Search"
            ref={searchString}
            onChange={() => {
              handleSearch();
            }}
          ></input>
          <Nav.Link
            onClick={() => {
              handleLogout();
            }}
          >
          <p style={{ cursor: "pointer"}}>
            
            <ExitToAppIcon style={{ cursor: "pointer", marginRight: "10px" }} />
            ({userEmail})
          </p>
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
