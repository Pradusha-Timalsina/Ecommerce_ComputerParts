import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";

const ProductCart = ({}) => {
  return (
    <div className="bottom">
      <div>
        <img
          className="productimage"
          src="https://perixx.com/cdn/shop/files/PB-835-WEB-banner-mobile_1_x800.jpg?v=1689597157"
          alt="ssa"
        />
      </div>
      <div className="productCartdetails">
        <Link to="/" className="productName">
          Keyboard
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;
