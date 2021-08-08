import React, { useEffect, useState, useContext } from "react";
import { storeProducts, detailProduct } from "./data";
import { db } from "./../firebase";
import firebase from "firebase";
// import ProductList from "./ProductList";

const ProductContext = React.createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export default function ProductProvider({ children }) {
  let userID = null;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user is", user.uid);
      userID = user.uid;
    }
  });
  // const [storeProducts, setstoreProducts] = useState([]);
  const [productState, setProductState] = useState({
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalProduct: detailProduct,
    modalOpen: false,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  });

  const setProducts = () => {
    db.collection("users data").doc(userID)
      .get()
      .then((doc) => {
        console.log(userID, "is the user ID", doc.data())
        if (doc.exists) {
          console.log("Document exist", doc.data());
          setProductState(doc.data());
        } else {
          console.log("not exist");
        }
      });
  };

  useEffect(() => {
    setProducts();
  }, []);

  const getItem = (id) => {
    const product = productState.products.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    let tempProductState = productState;
    tempProductState.detailProduct = product;
    setProductState(tempProductState);
  };

  const addToCart = (id) => {
    let tempProducts = [...productState.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    let tempProductState = productState;
    tempProductState.cart = [...tempProductState.cart, product];
    setProductState(tempProductState);
    addTotals();
  };

  const openModal = (id) => {
    const product = getItem(id);
    let tempProductState = productState;
    tempProductState.modalProduct = product;
    tempProductState.modalProduct = true;
    setProductState(tempProductState);
  };

  const closeModal = () => {
    let tempProductState = productState;
    tempProductState.modalProduct = false;
    setProductState(tempProductState);
  };

  const increment = (id) => {
    let tempCart = [...productState.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    let tempProductState = productState;
    tempProductState.cart = [...tempCart];
    setProductState(tempProductState);
    addTotals();
  };

  const decrement = (id) => {
    let tempCart = [...productState.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      let tempProductState = productState;
      tempProductState.cart = tempCart;
      setProductState(tempProductState);
    }
  };

  const removeItem = (id) => {
    let tempCart = [...productState.cart];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProducts = tempProducts[index];
    removedProducts.inCart = false;
    removedProducts.count = 0;
    removedProducts.total = 0;

    let tempProducts = productState.products;
    tempProducts.cart = tempCart;
    setProductState(tempProducts);
    addTotals();
  };

  const clearCart = () => {
    let tempProducts = productState;
    tempProducts.cart = [];
    setProductState(tempProducts);
    setProducts();
    addTotals();
  };

  const addTotals = () => {
    let subTotal = 0;
    productState.cart.map((item) => {
      subTotal += item.total;
      const temptax = 0.1 * subTotal;
      const tax = parseFloat(temptax.toFixed(2));
      const total = subTotal + tax;

      let tempProducts = productState;
      tempProducts.cartSubtotal = subTotal;
      tempProducts.cartTax = tax;
      tempProducts.cartTotal = total;
      setProductState(tempProducts);
    });
  };

  const value = {
    productState: productState,
    handleDetail: handleDetail,
    addToCart: addToCart,
    openModal: openModal,
    closeModal: closeModal,
    increment: increment,
    decrement: decrement,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer };
