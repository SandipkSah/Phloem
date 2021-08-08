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
import MyRequest from "./MyRequest/MyRequest";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <ProductProvider>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/addrequests" component={AddRequest} />
            <PrivateRoute exact path="/myrequests" component={MyRequest} />
          </ProductProvider>
          <Route path="/" component={Default}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
