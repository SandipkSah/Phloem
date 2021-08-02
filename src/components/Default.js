import React from "react";
import { useLocation } from "react-router-dom";

function Default() {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <div className="container align-items-center justify-content-center">
          <div className="row">
            <div className="col-10 mx-auto text-center text-center text-uppercase pt-5">
              <h1 className="display-3">404</h1>
              <h1>error</h1>
              <h2>page not found</h2>
              <h3>
                THe requested page '
                <span className="text-danger">
                  {location.pathname}
                </span>
                ' was not found
              </h3>
            </div>
          </div>
        </div>
    )
}

export default Default

