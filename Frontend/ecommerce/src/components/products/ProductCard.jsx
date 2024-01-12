import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/details`}>
      <div className="productCardImageContainer">
        {/* <img
          src="https://perixx.com/cdn/shop/files/PB-835-WEB-banner-mobile_1_x800.jpg?v=1689597157"
          alt=""
          className="productCardImage"
        /> */}
        <img
          className="productCardImage"
          src={product?.images[0]?.url}
          alt={product.name}
        />
      </div>
      <p>{product.name}</p>
      <div className="star">
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          {product.numOfReviews} Reviews{" "}
        </span>
      </div>
      <span className="starr">{`Rs.${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
