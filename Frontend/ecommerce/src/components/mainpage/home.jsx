import React, { Fragment, useEffect } from "react";

import Navbar from "../homepage/Navbar";
import Heropage from "../homepage/HeroPage";
import ProductCard from "../products/ProductCard";
import "./home.css";
import { Link } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products //redux ko state bata products fetch gareko
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar />
          <Heropage />
          <h2 className="h2">Products</h2>
          <div className="container">
            {/* <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard /> */}

            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
          <Link to="/productsPage" style={{ textDecoration: "none" }}>
            <button type="button" className="view_more">
              View more
            </button>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
