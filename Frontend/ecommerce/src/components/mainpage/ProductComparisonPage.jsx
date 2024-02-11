import React, { useState } from "react";
import "./ProductComparisonPage.css"; // Import the CSS file

const ProductComparisonPage = () => {
  // Mocked product data
  const products = [
    {
      id: 1,
      name: "Keyboard",
      price: "$100",
      specs: {
        weight: "10 lbs",
        dimensions: "10 x 10 x 10 inches",
      },
      image: "product1.jpg",
    },
    {
      id: 2,
      name: "Mouse",
      price: "$120",
      specs: {
        weight: "12 lbs",
        dimensions: "12 x 12 x 12 inches",
      },
      image: "product2.jpg",
    },
    // Add more products as needed
  ];

  const [selectedProduct1, setSelectedProduct1] = useState(products[0]);
  const [selectedProduct2, setSelectedProduct2] = useState(products[1]);

  const handleProductSelect = (product, side) => {
    if (side === "left") {
      setSelectedProduct1(product);
    } else if (side === "right") {
      setSelectedProduct2(product);
    }
  };

  return (
    <div className="product-comparison-container">
      <div className="product-comparison-card">
        <h2>Product 1</h2>
        <img
          src={selectedProduct1.image}
          alt={selectedProduct1.name}
          className="product-image"
        />
        <select
          onChange={(e) =>
            handleProductSelect(
              products.find((p) => p.id === parseInt(e.target.value)),
              "left"
            )
          }
          className="product-select"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <h3>Specifications</h3>
        <ul>
          <li>Color: {selectedProduct1.specs.color}</li>
          <li>Weight: {selectedProduct1.specs.weight}</li>
          <li>Dimensions: {selectedProduct1.specs.dimensions}</li>
        </ul>
      </div>
      <div className="product-comparison-card">
        <h2>Product 2</h2>
        <img
          src={selectedProduct2.image}
          alt={selectedProduct2.name}
          className="product-image"
        />
        <select
          onChange={(e) =>
            handleProductSelect(
              products.find((p) => p.id === parseInt(e.target.value)),
              "right"
            )
          }
          className="product-select"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <h3>Specifications</h3>
        <ul>
          <li>Color: {selectedProduct2.specs.color}</li>
          <li>Weight: {selectedProduct2.specs.weight}</li>
          <li>Dimensions: {selectedProduct2.specs.dimensions}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductComparisonPage;
