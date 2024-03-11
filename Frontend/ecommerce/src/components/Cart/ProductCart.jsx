import React from "react";
import { Link } from "react-router-dom";
import "./ProductCart.css";

const ProductCart = ({ item, deleteCartItems }) => {
  return (
    <div className="bottom">
      <div>
        <img className="productimage" src={item.image} alt="sp" />
      </div>
      <div className="productCartdetails">
        <Link to={`/product/${item.product}`} className="productName">
          {item.name}
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;