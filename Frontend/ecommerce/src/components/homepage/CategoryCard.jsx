import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductCard } from "../products/ProductCard";
import "./category.css";

const CategoryCard = () => {
  const [categoryProducts, setProducts] = useState([]);

  const cat = useParams().cat;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/category/products/${cat}`
        );
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [cat]);

  return (
    <Fragment>
      <div className="categoryPContainer">
        <h2>{cat}</h2>
        <div className="categoryProducts">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              className="productCard"
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryCard;
