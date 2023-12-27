import React from "react";
import Navbar from "../homepage/Navbar";

const ProductsPage = () => {
  return (
    <Fragment>
      <Navbar />
      <h2 className="h2">Products</h2>
      <div className="container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Link to="/productsPage" style={{ textDecoration: "none" }}>
        <button type="button" className="view_more">
          View more
        </button>
      </Link>
    </Fragment>
  );
};

export default ProductsPage;
