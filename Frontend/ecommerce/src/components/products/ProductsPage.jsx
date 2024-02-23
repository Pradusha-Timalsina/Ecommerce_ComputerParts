import React, { Fragment, useEffect } from "react";
import Navbar from "../homepage/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products //redux ko state bata products fetch gareko
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {/* <h2 className="h2">Products</h2> */}
      <div className="product_page_container">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
    </Fragment>
  );
};

export default ProductsPage;
