import React, { useEffect, useState, useContext } from "react";
import { storeProducts, detailProduct } from "./data";
import { db } from "../firebase";
import firebase from "firebase";
// import ProductList from "./ProductList";

const ProductContext = React.createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export default function ProductProvider({ children }) {
  let userID = "";

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user is", user.uid);
      userID = user.uid;
    }
  });

  // const [storeProducts, setstoreProducts] = useState([]);
  const [productState, setProductState] = useState({
    cartProducts: [],
    modalProduct: {},
    modalOpen: false,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  });

  const [publicProducts, setpublicProducts] = useState([]);

  const addRequests = (requestObj) => {
    console.log("hello from add requests")
    // db.collection("public")
    //   .doc("posts")
    //   .set(requestObj)
    //   .then(() => {
    //     console.log("post added successfully");
    //   });
  };

  const setPosts = () => {
    setpublicProducts(storeProducts);
    db.collection("public")
      .doc("posts")
      .get()
      .then((doc) => {
        setpublicProducts(doc.data().products);
      });
  };

  const setUserData = () => {
    setpublicProducts(storeProducts);
    db.collection("users data")
      .doc(userID)
      .get()
      .then((doc) => {
        setProductState(doc.data());
      });
  };

  useEffect(() => {
    setUserData();
    setPosts();
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
    console.log("add to cart");
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
    console.log("hello from clear cart");
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
    publicProducts: publicProducts,
    handleDetail: handleDetail,
    addToCart: addToCart,
    openModal: openModal,
    closeModal: closeModal,
    increment: increment,
    decrement: decrement,
    removeItem: removeItem,
    clearCart: clearCart,
    addRequests: addRequests,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer };
