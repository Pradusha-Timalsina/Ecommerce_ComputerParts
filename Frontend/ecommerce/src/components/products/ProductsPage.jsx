import React, { Fragment } from "react";
import Navbar from "../homepage/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
  return (
    <Fragment>
      <Navbar />
      {/* <h2 className="h2">Products</h2> */}
      <div className="container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </Fragment>
  );
};

export default ProductsPage;
