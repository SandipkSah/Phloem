// <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3 productWrapper">
//   <div className="card ">
//     <div
//       className="img-container p-5"
//       onClick={() => {
//         handleDetail(id);
//       }}
//     >
//       <Link to="/detail">
//         <img src={img||defaultImg} alt="img" width="50px" height="200px" className="card-img-top" />
//       </Link>
//       <IconButton
//         aria-label="delete"
//         className="cart-btn display-4"
//         onClick={() => {
//           addToCart(id);
//         }}
//       >
//         <AddShoppingCartIcon />
//       </IconButton>
//     </div>
//     <div className="card-footer d-flex justify-content-between">
//       <p className="align-self-center mb-0">{title}</p>
//       <h5 className="text-blue font-italic mb-0">
//         <span className="mr-1">$</span>
//         {price}
//       </h5>
//     </div>

//   </div>
// </ProductWrapper>

// const ProductWrapper = styled.div`
//   .card {
//     border-color: transparent;
//     transition: all 1s linear;
//   }
//   .card-footer {
//     background: transparent;
//     border-top: transparent;
//     transition: all 1s linear;
//   }
//   &:hover {
//     .card {
//       border: 0.04rem solid rgba(0, 0, 0, 0.2);
//       box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
//       background: #d0d0d0;
//     }
//     .card-footer {
//       background: rgba(247, 247, 247);
//     }
//   }
//   .img-container {
//     position: relative;
//     overflow: hidden;
//   }
//   .card-img-top {
//     transition: all 1s linear;
//   }
//   .img-container:hover .card-img-top {
//     transform: scale(1.2);
//   }
//   .cart-btn {
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     background: var(--lightBlue);
//     padding: 0.2rem 0.4rem;
//     border: none;
//     color: var(--mainWhite);
//     font-size: 1.7rem;
//     border-radius: 0.5rem 0 0 0;
//     transform: translate(100%, 100%);
//     transition: all 1s linear;
//   }
//   .img-container: hover .cart-btn {
//     transform: translate(0, 0);
//   }

//   .cart-btn:hover {
//     color: var(--mainBlue);
//     cursor: pointer;
//   }
// `;

{
  /* <div className="categories">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <img
                src="https://mcleansmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                alt="img"
              />
            </div>
            <div className="col-3">
              <img
                src="https://mcleansmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                alt="img"
              />
            </div>
            <div className="col-3">
              <img
                src="https://mcleansmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div> */
}
{
  /* -----------------------FEATURED */
}



// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // userIDtest = user.uid;
//     console.log("ussssssssssss", user.uid);
//     let teeem = user.uid;
//     setuserID(teeem);
//     console.log("ussssssssssss", userID);
//     // userID = user.uid;
//     // window.userEmail = user.email;
//     console.log("user is sss", userID);
//     setuserEmail(user.email);
//     setUserData();
//     setPosts();
//     // console.log("windows email is ", window.userEmail);
//   }
// });
// var user = firebase.auth().currentUser;

// console.log("from currentuser is:", user.uid);
// setuserID(user.uid);
// if (user.uid) {
//   setUserData();
//   setPosts();
// }
// console.log("Running App useEffect...");

// const authListener = firebase.auth().onAuthStateChanged((authUser) => {
//   // console.log(authUser);
//   console.log(authUser.uid);

//   if (authUser) {
//     setuserID(authUser.uid);
//     console.log("-------------------------", userID);
//     // setAuthWasListened(true);
//   } else {
//     setuserID(null);
//     // setAuthWasListened(true);
//   }
// });
// setUserData();
// setPosts();
// console.log("the userID from setuserID with new implement", userID);
// console.log("runnug from useEffect",firebase.auth().currentUser)

// setuserID(firebase.auth().currentUser.uid)
// console.log("runnug from useEffect",tempuserdetail)
// const getUserLoginInfo = () => {
//   console.log("userEmail is ::::", userEmail);
//   return userEmail;
// };

{
  /* <Button
              variant="outline-success"
              // onClick={() => {
              //   // console.log("--------------")
              //   handleSearch();
              // }}
            >
              Search
            </Button> */
}

    // <div className="container py-5">
    //   {console.log("added to Cart", addedToCart)}
    //   <div className="row">
    //     <div className="col-10 mx-auto  text-center text-slanted text-blue my-5">
    //       <h1>{title}</h1>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-10 mx-auto col-md-6 my-3">
    //       <img src={img} alt="product" className="img-fluid" />
    //     </div>
    //     <div className="col-10 col-md-6 my-3 text-capitalize">
    //       <h4 className="text-blue">
    //         <strong>Requested by? :{requestingParty.email}</strong>
    //       </h4>

    //       <p>How much S/he can pay? :{priceRange}</p>

    //       <p>Where Can You find it? :{expectedPlace}</p>

    //       <div className="container ">
    //         <p className="text-muted ">Description:{description}</p>
    //       </div>

    //       <div className="mt-auto">
    //         <Link to="/">
    //           <Button
    //             className="btn btn-primary"
    //             style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
    //           >
    //             Back to home
    //           </Button>
    //         </Link>{" "}
    //         {!yesAddedTocart ? (
    //           <Button
    //             style={{ margin: "1rem", padding: "1rem", borderRadius: "40%" }}
    //             onClick={() => {
    //               addToCart(id);
    //               changeText(id);
    //               // window.location.reload()
    //             }}
    //           >
    //             Add to Cart
    //           </Button>
    //         ) : (
    //           <Button
    //             style={{
    //               margin: "1rem",
    //               padding: "1rem",
    //               borderRadius: "40%",
    //               backgroundColor: "grey",
    //             }}
    //             disabled
    //           >
    //             Added to Cart
    //           </Button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
