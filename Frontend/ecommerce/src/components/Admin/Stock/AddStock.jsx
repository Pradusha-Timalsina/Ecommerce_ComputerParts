import React from "react";
import { Fragment, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StockHistory from "./StockHistory";
import "./addstock.css";
import { getProductDetails } from "../../../actions/productAction";
import { updateProductStock } from "../../../actions/stockAction";
import Sidebar from "../Sidebar";
import Alertbar from "../../Alert/Alert";
const AddStock = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const productStockSubmitHandler = async (e) => {
    e.preventDefault();
    const newStock = Number(stock);
    if (newStock <= -1) {
      setMessage("Stock value must be a positive number.");
      setStatus("error");
      setOpen(true);
      return;
    } else if (newStock <= 0) {
      setMessage("Stock value must not be 0");
      setStatus("error");
      setOpen(true);
      return;
    } else {
      setMessage("Stock added successfully");
      setStatus("success");
      setOpen(true);
    }

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
      <Alertbar
        message={message}
        status={status}
        open={open}
        handleClose={handleClose}
      />
    </Fragment>
  );
};

export default AddStock;
