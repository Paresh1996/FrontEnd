import "./App.css";
import Header from "./components/Header";
import RegSupplier from "./components/RegSupplier";
import NavBar from "./components/NavBar";
import RegCustomer from "./components/RegCustomer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminProfile from "./components/AdminProfile";
import AllCustomers from "./components/AllCustomers";
import AllSellers from "./components/AllSellers";
import SellerLogin from "./components/SellerLogin";
import CustomerLogin from "./components/CustomerLogin";
import SellerProfile from "./components/SellerProfile";
import AddProduct from "./components/AddProduct";
import MyProducts from "./components/MyProducts";
import AllProduct from "./components/AllProducts";
import EditProduct from "./components/EditProduct";
import CustomerProfile from "./components/CustomerProfile";
import MyOrders from "./components/MyOrders";
import Orders from "./components/Orders";
import ViewCart from "./components/ViewCart";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailForForgotPassword from "./components/EmailForForgotPassword";
import EnterToken from "./components/EnterToken";
import ResetPassword from "./components/ResetPassword";
import ErrorPage from "./components/ErrorPage";
import Qna from "./components/Qna";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route component={AllProduct} path="/" exact />
          <Route component={AllProduct} path="/cats" />
          <Route component={RegSupplier} path="/regsupplier" />
          <Route component={RegCustomer} path="/register" />
          <Route component={AdminLogin} path="/alogin" />
          <Route component={SellerLogin} path="/slogin" />
          <Route component={CustomerLogin} path="/clogin" />
          <Route component={AdminProfile} path="/aprofile" />
          <Route component={SellerProfile} path="/sprofile" />
          <Route component={CustomerProfile} path="/cprofile" />
          <Route component={AllCustomers} path="/customers" />
          <Route component={AllSellers} path="/sellers" />
          <Route component={AddProduct} path="/add-product" />
          <Route component={EditProduct} path="/edit/:prodid" />
          <Route component={MyProducts} path="/myproducts" />
          <Route component={MyOrders} path="/myorders" />
          <Route component={Orders} path="/orders" />
          <Route component={ViewCart} path="/cart" />
          <Route component={Qna} path="/qna" />
          <Route exact path="/enter-token" component={EnterToken}></Route>
          <Route exact path="/reset-password" component={ResetPassword}></Route>
          <Route
            exact
            path="/email-for-forgot-password"
            component={EmailForForgotPassword}
          ></Route>
          <Route component={ErrorPage} path="*" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
