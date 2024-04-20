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
// import ProductComparisonPage from "./components/mainpage/ProductComparisonPage";
import { ForgetPassword } from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Category from "./components/Admin/Category";
import UpdateProduct from "./components/Admin/UpdateProduct";
import { CategoryList } from "./components/Admin/CategoryList";
import { getAllCategory } from "./actions/categoryAction";
import UpdateProfile from "./components/User/UpdateProfile";

import AddStock from "./components/Admin/Stock/AddStock";
import Shipping from "./components/Cart/Shipping/Shipping";
import CategoryCard from "./components/homepage/CategoryCard";
import { Search } from "./components/products/Search";
import OrderDetails from "./components/Cart/Shipping/OrderDetails";
import { ComparePage } from "./components/homepage/ComparePage/ComparePage";
import UserOrderDetails from "./components/Orders/UserOrderDetail";
import {UpdateOrder} from "./components/Admin/UpdateOrder";
import Success from "./components/Orders/Success";

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
        <Route path="/products/page" element={<ProductsPage />} />
        <Route path="/shopping/cart" element={<ShoppingCart />} />
        <Route path="/admin/dashboard" element={<Main />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/stock/:id" element={<AddStock />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/create/product" element={<CreateProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/create/category" element={<Category />} />
        <Route path="/admin/category/all" element={<CategoryList />} />
        <Route path="/category/:cat" element={<CategoryCard />} exact />
        {/* <Route path="/me/update" element={<UpdateProfile />} /> */}
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/user/profile" element={<Userdetails />} />
        <Route path="/user/update/profile" element={<UpdateProfile />} />
        <Route path="/comparison/page" element={<ComparePage />} />
        <Route path="/forget/password" element={<ForgetPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/products/:search" element={<Search />} />
        <Route path="/order/details" element={<OrderDetails />} />
        <Route path="/myorder/details/:id" element={<UserOrderDetails />} />
        <Route path="/admin/order/:id" element={<UpdateOrder/>} />
        <Route path="/order/success" element={<Success/>} />
      </Routes>
    </Router>
  );
}

export default App;
