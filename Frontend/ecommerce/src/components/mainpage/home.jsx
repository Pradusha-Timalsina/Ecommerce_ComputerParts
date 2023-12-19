import React, { Fragment } from "react";

import Navbar from "../homepage/Navbar";
import Heropage from "../homepage/HeroPage";
import ProductCard from "../products/ProductCard";
import "./home.css";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <Heropage />
      <h2 className="h2">Products</h2>
      <div className="container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </Fragment>
  );
};

export default Home;
