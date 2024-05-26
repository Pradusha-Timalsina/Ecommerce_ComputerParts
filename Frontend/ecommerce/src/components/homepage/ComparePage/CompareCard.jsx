import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeOneCompare } from "../../../Redux/compareProductSlice";
import React, { Fragment, useEffect, useState } from "react";
import "./comparecard.css";
import { Rating } from "@material-ui/lab";
export const CompareCard = ({ firstProduct, secondProduct, products }) => {
  // Function to get product information based on product name
  const getProductInfo = (productName) => {
    // Find the product with the matching name
    const product = products.find((product) => product.name === productName);

    // Return product information if found, or default values if not found
    return product
      ? {
          images: product.images[0]?.url,
          name: product.name,
          price: product.price,
          stock: product.stock,
          ratings: product.ratings,
          description: product.description,
          brand: product.brand,
          color: product.color,
        }
      : {
          image: "",
          name: "",
          price: "",
          stock: "",
          ratings: "",
          description: "",
          brand: "",
          color: "",
        };
  };

  // Fetch product information for the first selected product
  const firstProductInfo = getProductInfo(firstProduct);

  // Fetch product information for the second selected product
  const secondProductInfo = getProductInfo(secondProduct);

  const options = {
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      <div className="compare-card-container">
        <div className="image-container">
          <img
            className="image"
            src={firstProductInfo?.images}
            alt={firstProductInfo.name}
          />
        </div>
        <h3 className="title">{firstProductInfo.name}</h3>
        <div className="product-info-container">
          <div className="info">
            {" "}
            Price <span className="value"> RS {firstProductInfo.price}</span>
          </div>
          <div className="info">
            {" "}
            InStock <span className="value"> {firstProductInfo.stock} </span>
          </div>
          <div className="info">
            {" "}
            Rating{" "}
            <span className="value">
              {" "}
              <Rating {...options} value={firstProductInfo.ratings} />{" "}
            </span>
          </div>
          <div className="info">
            {" "}
            Brand <span className="value"> {firstProductInfo.brand} </span>
          </div>
          <div className="info">
            {" "}
            Color <span className="value"> {firstProductInfo.color} </span>
          </div>
        </div>
        <div className="product-desc-container">
          <div className="info">Description</div>
          <div className="desc">{firstProductInfo.description}</div>
        </div>
      </div>

      {/* second Product */}

      <div className="compare-second-card-container">
        <div className="image-second-container">
          <img
            className="image-second"
            src={secondProductInfo?.images}
            alt={secondProductInfo.name}
          />
        </div>
        <h3 className="title-second">{secondProductInfo.name}</h3>
        <div className="product-second-info-container">
          <div className="info-second">
            {" "}
            Price{" "}
            <span className="value-second"> RS {secondProductInfo.price}</span>
          </div>
          <div className="info-second">
            {" "}
            InStock{" "}
            <span className="value-second"> {secondProductInfo.stock} </span>
          </div>
          <div className="info-second">
            {" "}
            Rating{" "}
            <span className="value-second">
              {" "}
              <Rating {...options} value={secondProductInfo.ratings} />{" "}
            </span>
          </div>
          <div className="info-second">
            {" "}
            Brand{" "}
            <span className="value-second"> {secondProductInfo.brand} </span>
          </div>
          <div className="info-second">
            {" "}
            Color{" "}
            <span className="value-second"> {secondProductInfo.color} </span>
          </div>
        </div>
        <div className="product-second-desc-container">
          <div className="info-second">Description</div>
          <div className="desc-second">{secondProductInfo.description}</div>
        </div>
      </div>
    </Fragment>
  );
};
