import {
  STOCK_UPDATE_SUCCESS,
  STOCK_UPDATE_FAIL,
  CLEAR_ERRORS,
  ADD_STOCK_HISTORY,
  DELETE_STOCK_HISTORY,
} from "../constants/stockConstants";

const initialState = {
  products: {
    stock_history: [],
  },
  error: null,
};

export const productStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOCK_UPDATE_SUCCESS:
      return { products: action.payload, error: "" };

    case STOCK_UPDATE_FAIL:
      return { products: null, error: action.payload };

    case ADD_STOCK_HISTORY:
      const { stock, stockHistory } = action.payload;
      const updatedProduct = {
        ...state.products,
        stock,
        stock_history: [...state.products.stock_history, stockHistory],
      };

      return {
        ...state,
        products: updatedProduct,
      };

    case DELETE_STOCK_HISTORY:
      const filteredHistory = state.products.stock_history.filter(
        (historyItem) => historyItem.date !== action.payload
      );

      const updatedStock = filteredHistory.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );

      return {
        ...state,
        product: {
          ...state.products,
          stock: updatedStock,
          stock_history: filteredHistory,
        },
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
