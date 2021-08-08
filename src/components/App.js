import "./../App.css";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
// import UpdateProfile from "./UpdateProfile";
import Default from "./Default";
import ProductList from "./ProductList";
import ProductProvider from "./ProductContext";
import AddRequest from "./AddRequest";
import MyRequest from "./MyRequest";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <ProductProvider>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/addrequests" component={AddRequest} />
            <PrivateRoute path="/myrequests" component={MyRequest} />
          </ProductProvider>
          <Route component={Default} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
