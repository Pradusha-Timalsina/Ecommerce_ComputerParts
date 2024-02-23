import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "./Stockhistory.css";

const StockHistory = () => {
  const { product } = useSelector((state) => state.productDetails);

  return (
    <Fragment>
      <div className="stock-history-container">
        <h2 className="stock-history-heading">Added Stock History</h2>
        {product &&
        product.stock_history &&
        product.stock_history.length === 0 ? (
          <p className="stock-history-message">
            No stock history for this product.
          </p>
        ) : (
          <table className="stock-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {product.stock_history &&
                product.stock_history.map((historyItem, index) => {
                  const date = moment(historyItem.date);
                  const formattedDate = date.format("MMM D, YYYY");
                  return (
                    <tr
                      key={historyItem.date}
                      className={
                        index % 2 === 0
                          ? "stock-history-row-even"
                          : "stock-history-row-odd"
                      }
                    >
                      <td>
                        <span className="stock-history-date">
                          {formattedDate}
                        </span>
                      </td>
                      <td className="stock-history-quantity">
                        {historyItem.quantity}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </Fragment>
  );
};

export default StockHistory;
