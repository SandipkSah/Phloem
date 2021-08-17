import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import "firebase/storage";


const ProductContext = React.createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export default function ProductProvider({ children }) {
  let tempPublicProduct = [];
  var userID = "";
  var userEmail = "";
  
  // const [userID, setuserID] = useState("")
  // const [userEmail, setuserEmail] = useState("")
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userID = user.uid;
      userEmail =user.email;
    //   setuserID(user.uid)
    //   setuserEmail(user.email);
    // }
    }
  });
  console.log("the current user is :", userID, userEmail);

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
  const [rerenderInvoke, setRerenderInvoke] = useState(false);

  useEffect(() => {
    userID && setUserData();
    userID && setPosts();
  }, [rerenderInvoke]);

  const setPosts = async () => {
    tempPublicProduct = [];

    const snapshot = await db.collection("public_posts").get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      tempPublicProduct.push({ ...doc.data(), id: doc.id });
    });
    setpublicProducts(tempPublicProduct);
    setRerenderInvoke(!rerenderInvoke);
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
          // console.log("userProductState is ", userProductState);
        } else {
          db.collection("users data").doc(userID).set({
            acceptedProducts: [],
            addedProducts: [],
            cartOfUser: [],
          });
        }
      });
    setRerenderInvoke(!rerenderInvoke);
  };

  const getItem = (id) => {
    const product = publicProducts.find((eachItem) => eachItem.id === id);
    //console.log("the real product is from get item",product)
    return product;
  };

  const addToPublicPosts = (addedPost) => {
    db.collection("public_posts")
      .doc()
      .set(addedPost)
      .then((res) => {
        console.log("a post added to the public posts");
      })
      .catch(() => {
        console.log("Error while making post");
      });
  };

  const removeItemFromPublic = (id) => {
    db.collection("public_posts").doc(id).delete();
    console.log("object with object id ", id, "is deleted");
    setPosts();
    setUserData();
  };

  const addRequests = async (addedPost) => {
    console.log("the data toare", addedPost);
    addToPublicPosts(addedPost);

    let document = await db.collection("users data").doc(userID).get();

    if (!(document && document.exists)) {
      await db
        .collection("users data")
        .doc(userID)
        .set({
          acceptedProducts: [],
          addedProducts: [],
          cartOfUser: [],
        })
        .then(() => {
          console.log("doc created for new user");
        });
    }

    await db
      .collection("users data")
      .doc(userID)
      .update({
        addedProducts: firebase.firestore.FieldValue.arrayUnion(addedPost),
      })
      .then(() => {
        console.log("product added to added products of usersData");
      });

    //The above code adds data to user data collection
    setPosts();
    setUserData();
    setRerenderInvoke(!rerenderInvoke);
  };

  const addToCart = (id) => {
    const tempPost = getItem(id);
    db.collection("users data")
      .doc(userID)
      .update({
        cartOfUser: firebase.firestore.FieldValue.arrayUnion(tempPost),
      })
      .then(() => {
        console.log(
          "product added to the carts of usersData and the product added is ",
          tempPost
        );
      });

    db.collection("public_posts")
      .doc(id)
      .update({
        addedToCart: true,
      })
      .then(() => {
        console.log("addedtoCart of public Post", tempPost, "is turned on");
      });

    // db.collection("public_posts").doc(id).update({ addToPublicPosts: true });
    setRerenderInvoke(!rerenderInvoke);
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

  const removeItemFromCart = async (id) => {
    userProductState.cartOfUser = userProductState.cartOfUser.filter(
      (eachCartProduct) => eachCartProduct.id !== id
    );
    db.collection("users data")
      .doc(userID)
      .update({ cartOfUser: userProductState.cartOfUser })
      .then(() =>
        console.log(
          "cartOfUser successfully set of userID ::",
          userID,
          "and eamil ::",
          userEmail
        )
      );
    db.collection("public_posts").doc(id).update({ addedToCart: false });
    setRerenderInvoke(!rerenderInvoke);
  };

  const removeItemFromAdded = async (id) => {
    const tempPost = getItem(id);

    userProductState.addedProducts = userProductState.addedProducts.filter(
      (eachAddedPost) => eachAddedPost.id !== id
    );
    await db
      .collection("users data")
      .doc(userID)
      .update({
        addedProducts: userProductState.addedProducts,
      })
      .then(() => {
        console.log(
          "product removed from addedProducts, the product is",
          tempPost
        );
      });

    removeItemFromPublic(id);
    setRerenderInvoke(!rerenderInvoke);
  };

  const clearCart = async () => {
    console.log("hello from clear cart");
    userProductState.cartOfUser.map((eachRemovedPost) =>
      removeItemFromPublic(eachRemovedPost.id)
    );
    await db
      .collection("users data")
      .doc(userID)
      .update({
        cartOfUser: [],
      })
      .then(() => {
        console.log("cart emptied");
      });
  };

  const uploadRef = async (file, newName) => {
    console.log("the file is ", file);
    let imageURL = "";

    await firebase
      .storage()
      .ref()
      .child(`images/${newName}`)
      .put(file)
      .then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then((url) => {
          console.log("the url is :", url);
          imageURL = url;
        });
      });
    console.log("the image URL before returning");
    return imageURL;
  };

  const handleDatabase = () => {
    console.log("handling database.........");
    // console.log("the length of public productttttttttttt", publicProducts);
    // let tempHandleDBVar = [];
    // publicProducts.map((eachPublicPost) => {
    //   eachPublicPost.requestingParty.id == userID
    //     ? tempHandleDBVar.push(eachPublicPost)
    //     : console.log("NOTOFINTEREST");
    // });
    // db.collection("users data")
    //   .doc(userID)
    //   .update({ addedProducts: tempHandleDBVar })
    //   .then(() => console.log("data updated with :", tempHandleDBVar));
  };

  const getUserLoginInfo = () => {
    console.log("userEmail is ::::", userEmail);
    return userEmail;
  };

  const value = {
    getUserLoginInfo: getUserLoginInfo,
    userState: userProductState,
    publicProducts: publicProducts,
    addRequests: addRequests,
    handleDetail: handleDetail,
    addToCart: addToCart,
    openModal: openModal,
    closeModal: closeModal,
    removeItemFromCart: removeItemFromCart,
    removeItemFromAdded: removeItemFromAdded,
    clearCart: clearCart,
    uploadRef: uploadRef,
    handleDatabase: handleDatabase,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer };
