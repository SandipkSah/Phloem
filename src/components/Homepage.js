import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
// import { Card, Button, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
// import { Link, useHistory } from "react-router-dom"
import ProductList from "./ProductList";
import Navbar from "./Navbar";
import ProductProvider, { ProductConsumer, useProduct } from "./ProductContext";

export default function Dashboard() {
  


  return (
    <>
      <Navbar />
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </>
  );
}
