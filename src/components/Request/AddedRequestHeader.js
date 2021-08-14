import React from "react";

export default function CartColumns() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">Title</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">Category</p>
        </div>
        <div className="col-auto mx-auto col-lg-2">
          <p className="text-uppercase">Expected Price</p>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <p className="text-uppercase">remove</p>
        </div>
      </div>
    </div>
  );
}
