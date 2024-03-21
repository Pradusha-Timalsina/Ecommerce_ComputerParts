import axios from "axios";
import {
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  CLEAR_ERRORS,
  ADD_STOCK_HISTORY,
} from "../constants/stockConstants";

export const updateProductStock =
  (productId, stockData, stockHistory) => async (dispatch) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.put(
        `/api/v1/stock/${productId}`,
        stockData,
        {config}
      );

      console.log("Response:", response); // Log response object

      if (!response || !response.data) {
        throw new Error("Invalid response format");
      }

      dispatch({
        type: STOCK_UPDATE_SUCCESS,
        payload: response.data,
      });

      dispatch({
        type: ADD_STOCK_HISTORY,
        payload: { stock: stockData.stock, stockHistory },
      });
    } catch (error) {
      console.error("Update Product Stock Error:", error); // Log error
      dispatch({
        type: STOCK_UPDATE_FAIL,
        payload: error.response ? error.response.data.message : "Unknown error",
      });
    }

  };

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
