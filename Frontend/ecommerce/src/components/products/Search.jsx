import React, { Fragment, useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

import axios from "axios";

export const Search = () => {
  const params = useParams();

  const keyword = params.search;
  const [productList, setProductList] = useState();

  useEffect(() => {
    const getSearch = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/products?keyword=${keyword}`
        );
        console.log(data.products);
        setProductList(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getSearch();
  }, [keyword]);

  return (
    <Fragment>
      <div>
        <h2 className="productsHeading">Products</h2>
        <div className="product_page_container">
          {productList &&
            productList.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};
