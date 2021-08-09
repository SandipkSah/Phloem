import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../css/AddRequest.css";
import Navbar from "../Navbar";
import { useProduct } from "../ProductContext";
import { db } from "../../firebase";
import firebase from "firebase";

export default function AddRequest() {
  
  const history = useHistory();

  const { addRequests } = useProduct();

  let userID = "";

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user is", user.uid);
      userID = user.uid;
    }
  });

  const CategoryOptions = [
    "Electronics",
    "Art",
    "Food",
    "Books",
    "Memoir",
    "Other",
  ];

  const PriceOptions = [
    "0-50 EUR",
    "50-100 EUR",
    "100-200 EUR",
    "200-500 EUR",
    "500-1000 EUR",
    ">1000 EUR",
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("funciton invoked ...........................");
    const requestObject = {
      title: event.target.title.value,
      expectedPlace: event.target.expectedPlace.value,
      category: event.target.category.value,
      priceRange: event.target.priceRange.value,
      description: event.target.description.value,
      timestamp: new Date()
      // img:event.target.img
    };
    console.log("event.target''''''''''''' the object is ", requestObject);

    // db.collection("users data").doc(userID).set(requestObject);
    history.push("/");
    AddRequest(requestObject);
  };

  return (
    <div>
      <Navbar />
      {/* {addRequests()} */}
      <div className="contact_form" id="Write">
        <h2
          className="section-title section-title-contact-me"
          id="contact-me-title"
        >
          Make a request
        </h2>
        <div className="container">
          <div className="wrapper animated bounceInLeft">
            <div className="contact" id="contactMe">
              <form
                onSubmit={(e) => {
                  // console.log("from forrrrrrrrrrrrrr",e.target.title.value)
                  handleFormSubmit(e);
                }}
              >
                <p>
                  <label>
                    Request Title<span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <input type="text" name="title" className="input_box" />
                </p>
                <p>
                  <label>
                    Category<span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <select name="category" id="pet-select" className="input_box">
                    <option value="">--Please choose an option--</option>
                    {CategoryOptions.map((eachOption) => (
                      <option value={eachOption}>{eachOption}</option>
                    ))}
                  </select>
                </p>

                <p>
                  <label>
                    Expected Place of finding
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="expectedPlace"
                    className="input_box"
                  />
                </p>
                <p>
                  <label>
                    Expected Price Range<span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <select
                    name="priceRange"
                    id="pet-select"
                    className="input_box"
                  >
                    <option value="">--Please choose an option--</option>
                    {PriceOptions.map((eachOption) => (
                      <option value={eachOption}>{eachOption}</option>
                    ))}
                  </select>
                </p>
                <p className="full">
                  <label>
                    Description<span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <textarea name="description" rows="5"></textarea>
                </p>

                {/* <p className="full">
                  <label>
                    Add an image to make it easy
                    <span style={{ fontSize: "0.8rem" }}>(optional)</span>
                  </label>
                  <input
                    type="file"
                    name="img"
                    className="input_box"
                  />
                </p> */}

                <p className="full">
                  <button>Submit</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
