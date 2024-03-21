import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import "./comparepage.css";
import { CompareCard } from "./CompareCard";


export const ComparePage = () => {
  const { products } = useSelector((state) => state.products); //redux ko state bata products fetch gareko
  const [firstProduct, setFirstProduct] = useState("");
  const [secondProduct, setSecondProduct] = useState("");

  const handleFirstProductChange = (event) => {
    const selectedProduct = event.target.value;
    setFirstProduct(selectedProduct);
    if (selectedProduct === secondProduct) {
      setSecondProduct("");
    }
  };

  const handleSecondProductChange = (event) => {
    const selectedProduct = event.target.value;
    setSecondProduct(selectedProduct);
    if (selectedProduct === firstProduct) {
      setFirstProduct("");
    }
  };

  return (
    <div className="container">
      <>
        <div className="header">
          <h3 className="title">Compare List</h3>
        </div>
        <select
          className="first-product"
          value={firstProduct}
          onChange={handleFirstProductChange}
        >
          <option>Choose First product</option>
          {products &&
            products.map((product) => (
              <option
                key={product._id}
                value={product.name}
                disabled={product.name === secondProduct}
              >
                {product.name}
              </option>
            ))}
        </select>

        <select
          className="second-product"
          value={secondProduct}
          onChange={handleSecondProductChange}
        >
          <option>Choose Second product</option>
          {products &&
            products.map((product) => (
              <option
                key={product._id}
                value={product.name}
                disabled={product.name === firstProduct}
              >
                {product.name}
              </option>
            ))}
        </select>

        <div className="main-wrapper">
        <CompareCard firstProduct={firstProduct} secondProduct={secondProduct} products={products} />
        </div>
      </>

      
    </div>
  );
};
