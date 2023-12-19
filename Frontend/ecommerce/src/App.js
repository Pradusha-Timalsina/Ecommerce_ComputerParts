import Home from "./components/mainpage/home";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ProductDetails from "./components/products/ProductDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/details" exact element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
