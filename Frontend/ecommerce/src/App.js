import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/mainpage/home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Navbar from "./components/homepage/Navbar";
import ProductsPage from "./components/products/ProductsPage";
import ShoppingCart from "./components/Cart/ShoppingCart";
import { Main } from "./components/Admin/Main";
import { loadUser } from "./actions/userAction";
import Userdetails from "./components/User/Userdetails";
import CreateProduct from "./components/Admin/CreateProduct";
import ProductList from "./components/Admin/ProductList";
import { OrderList } from "./components/Admin/OrderList";
import { UserList } from "./components/Admin/UserList";
import { useDispatch } from "react-redux";
import store from "./store";
function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Router>
      {/* Navbar should be outside of Routes */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/details" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/admin/dashboard" element={<Main />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/create/product" element={<CreateProduct />} />
        <Route path="/user/profile" element={<Userdetails />} />
      </Routes>
    </Router>
  );
}

export default App;
