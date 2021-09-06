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

  const [userID, setuserID] = useState(
    firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
  );
  const [userEmail, setuserEmail] = useState(
    firebase.auth().currentUser ? firebase.auth().currentUser.email : null
  );

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
  const [detailProduct, setDetailProduct] = useState({});
  const [searchString, setSearchString] = useState("");

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
          });
        } else {
          db.collection("users data").doc(userID).set({
            acceptedProducts: [],
            addedProducts: [],
            cartOfUser: [],
          });
        }
      });
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
        console.log("a post added to the public Request");
      })
      .catch(() => {
        console.log("Error while making post");
      });
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

  const addToCart = async (id) => {
    const tempPost = getItem(id);
    console.log("ttest", id, tempPost);
    console.log("update from userstate here", userID);
    console.log("update from users data here, the userID is :", userID);
    await db
      .collection("users data")
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

    console.log("update from public collections here", id);
    await db
      .collection("public_posts")
      .doc(id)
      .update({
        addedToCart: true,
      })
      .then(() => {
        console.log("addedtoCart of public Post", tempPost, "is turned on");
      });
    handleDetail(id);
    setPosts();
    setUserData();
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailProduct(product);
  };

  const removeItemFromPublic = async (id) => {
    console.log("Before removing an object from db:", publicProducts);
    await db.collection("public_posts").doc(id).delete();
    console.log("object with object id ", id, "is deleted");
    setPosts();
    console.log("After removing an object from db:", publicProducts);
    setUserData();
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

    console.log("The item to be removed is :", tempPost);
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
      })
      .catch(() => {
        console.log(
          "Errorrrrrrrrr in removing products from addedProducts",
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
    // console.log("the file is ", file);
    let imageURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png";
    //default image in ncase there is no file uploaded
    // console.log("the file is ::", file);

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
    return imageURL;
  };

  const handleDatabase = async () => {
    console.log("handling database.........");
    // console.log(
    //   "the length of public productttttttttttt",
    //   publicProducts,
    //   "the current user is :",
    //   userID
    // );

    // let userIDArray = [];

    // await db
    //   .collection("users data")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((eachUserData) => {
    //       userIDArray.push(eachUserData.id);
    //       // console.log("the id of each user is ",userIDArray)
    //     });
    //   });

    // console.log("the userID array is ", userIDArray);
    // userIDArray.map(async (userID) => {
    //   let tempHandleDBVar = [];
    //   publicProducts.forEach((eachPublicPost) => {
    //     eachPublicPost.requestingParty.id === userID
    //       ? tempHandleDBVar.push(eachPublicPost)
    //       : console.log("NOTOFINTEREST");
    //   });
    //   console.log(
    //     "for the id :",
    //     userID,
    //     "the data of interst is :",
    //     tempHandleDBVar
    //   );
    //   await db
    //     .collection("users data")
    //     .doc(userID)
    //     .update({ addedProducts: tempHandleDBVar })
    //     .then(() => console.log("data updated with :", tempHandleDBVar));
    // });
  };

  const value = {
    userState: userProductState,
    detailProduct: detailProduct,
    publicProducts: publicProducts,
    addRequests: addRequests,
    handleDetail: handleDetail,
    addToCart: addToCart,
    removeItemFromCart: removeItemFromCart,
    removeItemFromAdded: removeItemFromAdded,
    clearCart: clearCart,
    uploadRef: uploadRef,
    handleDatabase: handleDatabase,
    userEmail: userEmail,
    setSearchString: setSearchString,
    searchString: searchString,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
