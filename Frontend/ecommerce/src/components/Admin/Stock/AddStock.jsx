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

  const productStockSummitHandler = (e) => {
    e.preventDefault();
    const newStock = Number(stock);

    const stockData = { stock: newStock };

    dispatch(updateProductStock(productId, stockData));
    dispatch(getProductDetails(productId));
  };

  return (
    <Fragment>
      <div className="grid_view_stock">
        <Sidebar />
        <div>
          <div className="stockContainer">
            <h1>Add Stock</h1>
            <form onSubmit={productStockSummitHandler} className="stockForm">
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
