import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import "./comparepage.css";
import { CompareCard } from "./CompareCard";

export const ComparePage = () => {
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [firstProduct, setFirstProduct] = useState("");
  const [secondProduct, setSecondProduct] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? categoryProducts.filter(
        (product) => product.category === selectedCategory
      )
    : [];

  useEffect(() => {
    // Fetch products for selected category
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/category/products/${selectedCategory}`
        );
        setCategoryProducts(response.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    // Reset product selections when category changes
    setFirstProduct("");
    setSecondProduct("");
  };

  const handleFirstProductChange = (event) => {
    setFirstProduct(event.target.value);
  };

  const handleSecondProductChange = (event) => {
    setSecondProduct(event.target.value);
  };
  return (
    <div className="container">
      <>
        <div className="header">
          <h3 className="title">Compare List</h3>
        </div>
        <h3 className="category-title-name">Choose Category</h3>
        <select
          className="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Choose a category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
        </select>

        <select
          className="first-product"
          value={firstProduct}
          onChange={handleFirstProductChange}
        >
          <option>Choose First product</option>
          {filteredProducts.map((product) => (
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
          {filteredProducts.map((product) => (
            <option
              key={product._id}
              value={product.name}
              disabled={product.name === firstProduct}
            >
              {product.name}
            </option>
          ))}
        </select>
        {(firstProduct || secondProduct) && (
          <div className="main-wrapper">
            {/* Pass filteredProducts as props */}
            <CompareCard
              firstProduct={firstProduct}
              secondProduct={secondProduct}
              products={filteredProducts}
            />
          </div>
        )}
      </>
    </div>
  );
};
