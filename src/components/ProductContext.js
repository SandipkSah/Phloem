import React, { useEffect, useState, useContext } from "react";
// import { storeProducts, detailProduct } from "./data";
import { db } from "../firebase";
import firebase from "firebase";

const ProductContext = React.createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export default function ProductProvider({ children }) {
  let tempPublicProduct = [];
  let userID = "";

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log("user is", user.uid);
      userID = user.uid;
    }
  });

  // const [storeProducts, setstoreProducts] = useState([]);
  const [userProductState, setUserProductState] = useState({
    addedProducts: [],
    cartProducts: [],
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
    modalOpen: false,
    modalProducts: {},
  });

  const [publicProducts, setpublicProducts] = useState([]);

  const addRequests = async (requestObjPublic, requestObjUser) => {
    //console.log("hello from add requests", requestObjPublic);

    db.collection("public_posts")
      .doc()
      .set(requestObjPublic)
      .then((res) => {
        //console.log("adding data to ooooooooooooooooooooo publicdata");
      });

    let document = await db.collection("users data").doc(userID).get();
    if (document && document.exists) {
      await db
        .collection("users data")
        .doc(userID)
        .update({
          addedProducts:
            firebase.firestore.FieldValue.arrayUnion(requestObjPublic),
        })
        .then(() => {
          console.log("product added to added products of usersData");
        });
    } else {
      await db
        .collection("users data")
        .doc(userID)
        .set(requestObjUser)
        .then(() => {
          console.log("product added to users data for the first time");
        });
    }
    setPosts();
    setUserData();
  };

  const setPosts = async () => {
    tempPublicProduct = [];

    const snapshot = await db.collection("public_posts").get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      tempPublicProduct.push({ ...doc.data(), id: doc.id });
      //console.log("=============j", tempPublicProduct);
      //console.log(doc.id, "=>", doc.data());
    });
    setpublicProducts(tempPublicProduct);
  };

  const setUserData = () => {
    db.collection("users data")
      .doc(userID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserProductState({
            ...doc.data(),
            modalProduct: {},
            modalOpen: false,
            detailProduct: {},
          });
        } else {
          db.collection("users data").doc(userID).set(userProductState);
        }
      });
  };

  useEffect(() => {
    userID && setUserData();
    userID && setPosts();
  }, []);

  const getItem = (id) => {
    const product = publicProducts.find((eachItem) => eachItem.id === id);
    // console.log("the real product is from get item",product)
    return product;
  };

  const handleDetail = (id) => {
    // console.log("from handle details, the id is :", id);
    const product = getItem(id);
    // console.log("the detail product is :", product);
    // let tempUserState = userProductState;
    userProductState.detailProduct = product;
    // setUserProductState(tempUserState);
    console.log("after changihng user State", userProductState.detailProduct);
  };

  const addToCart = (id) => {
    console.log("add to cart");
  };

  const openModal = (id) => {
    const product = getItem(id);
    let tempProductState = userProductState;
    tempProductState.modalProduct = product;
    tempProductState.modalProduct = true;
    setUserProductState(tempProductState);
  };

  const closeModal = () => {
    let tempProductState = userProductState;
    tempProductState.modalProduct = false;
    setUserProductState(tempProductState);
  };

  const removeItem = (id) => {
    console.log("hello from removeitem the id item is ", id);
  };

  const clearCart = () => {
    console.log("hello from clear cart");
  };

  const addTotals = () => {
    console.log("hello from addTotals ");
  };

  const value = {
    userState: userProductState,
    publicProducts: publicProducts,
    handleDetail: handleDetail,
    addToCart: addToCart,
    openModal: openModal,
    closeModal: closeModal,
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
