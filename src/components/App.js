import "./css/App.css";
import Signup from "./Authentication/Signup";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Homepage";
import Login from "./Authentication/Login";
import PrivateRoute from "./Route/PrivateRoute";
import ForgotPassword from "./Authentication/ForgotPassword";
import Default from "./Default";
import ProductProvider from "./ProductContext";
import AddRequest from "./AddRequest/AddRequest";
import MyRequest from "./Request/MyRequest";
import ThankUResponse from "./AddRequest/ThankURes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/requestsubmit" component={ThankUResponse} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <ProductProvider>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/addrequests" component={AddRequest} />
            <PrivateRoute exact path="/myrequests" component={MyRequest} />
          </ProductProvider>
          <Route path="/" component={Default} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
