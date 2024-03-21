import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeOneCompare } from "../../../Redux/compareProductSlice";
import React, { Fragment, useEffect, useState } from "react";
import "./comparecard.css";

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
          description: product.description,
        }
      : {
          image: "",
          name: "",
          price: "",
          description: "",
        };
  };

  // Fetch product information for the first selected product
  const firstProductInfo = getProductInfo(firstProduct);

  // Fetch product information for the second selected product
  const secondProductInfo = getProductInfo(secondProduct);
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
            InStock <span className="value">quantity</span>
          </div>
          <div className="info">
            {" "}
            Brand <span className="value">brand</span>
          </div>
          <div className="info">
            {" "}
            Sales <span className="value">sold</span>
          </div>
          <div className="info">
            {" "}
            Rating <span className="value">ratings</span>
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
            Price <span className="value-second"> RS {secondProductInfo.price}</span>
          </div>
          <div className="info-second">
            {" "}
            InStock <span className="value-second">quantity</span>
          </div>
          <div className="info-second">
            {" "}
            Brand <span className="value-second">brand</span>
          </div>
          <div className="info-second">
            {" "}
            Sales <span className="value-second">sold</span>
          </div>
          <div className="info-second">
            {" "}
            Rating <span className="value-second">ratings</span>
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
