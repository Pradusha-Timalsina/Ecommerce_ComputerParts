import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./ProductCard.css";

const ProductCard = () => {
  const options = {
    value: 4.5,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/details`}>
      <div className="productCardImageContainer">
        <img
          src="https://perixx.com/cdn/shop/files/PB-835-WEB-banner-mobile_1_x800.jpg?v=1689597157"
          alt=""
          className="productCardImage"
        />
      </div>
      <p>Keyboard</p>
      <div className="star">
        <Rating {...options} />{" "}
        <span className="productCardSpan"> (Reviews)</span>
      </div>
      <span className="starr">Rs.5000</span>
    </Link>
  );
};

export default ProductCard;
