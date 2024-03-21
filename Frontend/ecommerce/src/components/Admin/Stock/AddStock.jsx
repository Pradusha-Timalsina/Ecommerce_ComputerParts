import React from "react";
import { Fragment, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StockHistory from "./StockHistory";
import "./addstock.css";
import { getProductDetails } from "../../../actions/productAction";
import { updateProductStock } from "../../../actions/stockAction";
import Sidebar from "../Sidebar";

const AddStock = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { product } = useSelector((state) => state.productDetails);

  const [stock, setStock] = useState("");

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setStock(product.stock);
    }
  }, [dispatch, productId, product]);

  const stockHistory = []; // Define stockHistory if needed

  const productStockSubmitHandler = async (e) => {
    e.preventDefault();

    // Dispatch action to update product stock
    try {
      const newStock = Number(stock);
      const stockData = { stock: newStock };

      await dispatch(updateProductStock(productId, stockData, stockHistory));
      // If the dispatch is successful, reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error updating product stock:", error);
      // Handle error
    }
  };

  return (
    <Fragment>
      <div className="grid_view_stock">
        <Sidebar />
        <div>
          <div className="stockContainer">
            <h1>Add Stock</h1>
            <form onSubmit={productStockSubmitHandler} className="stockForm">
              <div className="inputContainer">

                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <button type="submit">Add Stock</button>
            </form>
          </div>
          <div className="stock-history-wrapper">
            <StockHistory productId={productId} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddStock;
