import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../homepage/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Pagination from "react-js-pagination";
import "./productpage.css";
const ProductsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([1000, 90000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const params = useParams();
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector(
    (state) => state.products //redux ko state bata products fetch gareko
  );
  const { categories } = useSelector((state) => state.categories);

  const keyword = params.keyword;
  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  const pricehandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

  return (
    <Fragment>
      {/* <h2 className="h2">Products</h2> */}
      <div className="product_page_container">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>

      <div className="filterBox">
        <h3>Price</h3>
        <Slider
          value={price}
          onChange={pricehandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={1000}
          max={90000}
        />
        <h3>Categories</h3>
        <ul className="categoryfilter">
          {categories &&
            categories.map((category) => (
              <li
                className="category-li "
                key={category.title}
                onClick={() => setCategory(category)}
              >
                {category.title}
              </li>
            ))}
        </ul>

        <h3 component="legend">Ratings Above</h3>
        <Rating
          value={ratings}
          onChange={(e, newRating) => {
            setRatings(newRating);
          }}
          precision={0.5}
        />
      </div>

      {resultPerPage < productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="⟩"
            prevPageText="⟨"
            firstPageText="«"
            lastPageText="»	"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default ProductsPage;
