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
    setSearchString(searchString.current.value);
  };

  const handleLogout = async () => {
    console.log("to be logged out");
    try {
      setError("");
      setLoading(true);
      await logout();
      history.push("/");
      console.log("logged out");
    } catch {
      setError("Failed to log out");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar bg="green" expand="lg" style={{backgroundColor:"rgb(202, 242, 198)"}}>
        <Navbar.Brand
          onClick={() => handleSubmitPhloem()}
          className="button_comp"
          disabled={loading}
        >
          Phloem
        </Navbar.Brand>
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
              My Requests
            </Nav.Link>
            <Nav.Link
              onClick={() => handleSubmitNewRequest()}
              className="button_comp"
              disabled={loading}
            >
              Make a Request
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                handleLogout();
              }}
            >
              <p style={{ cursor: "pointer", color: "black" }}>
                <ExitToAppIcon
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                ({userEmail})
              </p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <Navbar expand="lg" className="navbar_comp">
        <Navbar.Brand
          onClick={() => handleSubmitPhloem()}
          className="button_comp"
          disabled={loading}
        >
          Phloem
        </Navbar.Brand>
        
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
              My Requests
            </Nav.Link>
            <Nav.Link
              onClick={() => handleSubmitNewRequest()}
              className="button_comp"
              disabled={loading}
            >
              Make a Request
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                handleLogout();
              }}
            >
              <p style={{ cursor: "pointer", color: "black" }}>
                <ExitToAppIcon
                  style={{ cursor: "pointer", marginRight: "10px" }}
                />
                ({userEmail})
              </p>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {error && (
        <Alert variant="danger" style={{ textAlign: "center", margin: "auto" }}>
          {error}
        </Alert>
      )} */}
    </>
  );
}
