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

import Userdetails from "./components/User/Userdetails";
function App() {
  return (
    <Router>
      {/* Navbar should be outside of Routes */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/details" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productsPage" element={<ProductsPage />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/admin/dashboard" element={<Main />} />
        <Route path="/user/profile" element={<Userdetails />} />
      </Routes>
    </Router>
  );
}

export default App;
