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
        config
      );

      dispatch({
        type: STOCK_UPDATE_SUCCESS,
        payload: response.data.success,
      });

      dispatch({
        type: ADD_STOCK_HISTORY,
        payload: { stock: stockData.stock, stockHistory },
      });
    } catch (error) {
      dispatch({
        type: STOCK_UPDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const errorClear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
