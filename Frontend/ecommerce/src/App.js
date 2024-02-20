import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/mainpage/home";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Navbar from "./components/homepage/Navbar";
import Footer from "./components/Footer/Footer";
import ProductsPage from "./components/products/ProductsPage";
import ShoppingCart from "./components/Cart/ShoppingCart";
import { Main } from "./components/Admin/Main";
import { loadUser } from "./actions/userAction";
import Userdetails from "./components/User/Userdetails";
import CreateProduct from "./components/Admin/CreateProduct";
import UpdatePassword from "./components/User/UpdatePassword";
import { OrderList } from "./components/Admin/OrderList";
import { UserList } from "./components/Admin/UserList";
import { useDispatch } from "react-redux";
import store from "./store";
import { ProductList } from "./components/Admin/ProductList";
import ProductComparisonPage from "./components/mainpage/ProductComparisonPage";
import { ForgetPassword } from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Category from "./components/Admin/Category";
import UpdateProduct from "./components/Admin/UpdateProduct";
import { CategoryList } from "./components/Admin/CategoryList";
import { getAllCategory } from "./actions/categoryAction";
import UpdateProfile from "./components/User/UpdateProfile";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCategory());

    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {/* Navbar should be outside of Routes */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/shopping/cart" element={<ShoppingCart />} />
        <Route path="/admin/dashboard" element={<Main />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/create/product" element={<CreateProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/create/category" element={<Category />} />
        <Route path="/admin/category/all" element={<CategoryList />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/user/profile" element={<Userdetails />} />
        <Route path="/user/update/profile" element={<UpdateProfile />} />
        <Route path="/comparison/page" element={<ProductComparisonPage />} />
        <Route path="/forget/password" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />;
    </Router>
  );
}

export default App;
