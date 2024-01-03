import Home from "./components/mainpage/home";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Navbar from "./components/homepage/Navbar";
import ProductsPage from "./components/products/ProductsPage";
function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/details" exact element={<ProductDetails />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/productsPage" exact element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
