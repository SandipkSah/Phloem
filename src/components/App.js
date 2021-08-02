import "./../App.css";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Default from "./Default";
import ProductList from "./ProductList";
import { ProductConsumer } from "./ProductContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={ProductList} />
          <PrivateRoute path="/update-profile" component={ProductList} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

          <Route component={Default} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
