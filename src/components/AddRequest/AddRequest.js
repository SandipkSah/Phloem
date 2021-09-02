import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/AddRequest.css";
import Navbar from "../Navbar";
import { useProduct } from "../ProductContext";
import firebase from "firebase";

export default function AddRequest() {
  const history = useHistory();
  const [fileData, setFileData] = useState();
  const { addRequests, uploadRef } = useProduct();

  let userinfo = {};

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userinfo = { id: user.uid, email: user.email };
    }
  });

  const CategoryOptions = [
    "Electronics",
    "Art",
    "Food",
    "Books",
    "Souveneir",
    "Giveaway",
    "Other",
  ];

  const PriceOptions = [
    "0 EUR",
    "0-50 EUR",
    "50-100 EUR",
    "100-200 EUR",
    "200-500 EUR",
    "500-1000 EUR",
    ">1000 EUR",
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log("the file from handleform subit is ", fileData);
    uploadRef(fileData, event.target.title.value)
      .then((resultingURL) => {
        const requestObjPublic = {
          title: event.target.title.value,
          expectedPlace: event.target.expectedPlace.value,
          category: event.target.category.value,
          priceRange: event.target.priceRange.value,
          description: event.target.description.value,
          timestamp: new Date(),
          requestingParty: userinfo,
          addedToCart: false,
          img: resultingURL,
        };
        addRequests(requestObjPublic);
        history.push("/requestsubmit");
      })
      .catch((err) => {
        console.log("error uplodain image");
      });
  };

  return (
    <div>
      <Navbar />
      {/* <button
        onClick={handleDatabase()}
        style={{ width: "5rem", height: "3rem" }}
      >
        DB modify
      </button> */}

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
                // onChange={(e)=>{console.log("the image is ", e.target.files[0])}}
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
                      <option
                        key={CategoryOptions.indexOf(eachOption)}
                        value={eachOption}
                      >
                        {eachOption}
                      </option>
                    ))}
                  </select>
                </p>

                <p>
                  <label>
                    Expected Place of finding
                    {/* <span style={{ color: "red" }}>*</span> */}
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
                      <option
                        key={PriceOptions.indexOf(eachOption)}
                        value={eachOption}
                      >
                        {eachOption}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <label>
                    Upload image
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </label>
                  <input
                    type="file"
                    name="img"
                    onChange={(e) => {
                      console.log(
                        "the inputted file is",
                        e.target.files[0]
                      );
                      setFileData(e.target.files[0]);
                    }}
                  />
                </p>

                <p className="full">
                  <label>
                    Description<span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <textarea name="description" rows="5"></textarea>
                </p>

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
