import {

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL,
    ORDER_DETAILS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    CLEAR_ERRORS,
  } from '../constants/orderConstants';



  
  
  export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ALL_ORDERS_REQUEST:
        return {
          loading: true,
        };
      case ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
      case ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
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
  
  export const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ORDER_REQUEST:
      case DELETE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case UPDATE_ORDER_FAIL:
      case DELETE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case DELETE_ORDER_RESET:
        return {
          ...state,
          isDeleted: false,
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
  export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
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
  
  export const myOrdersReducer = (state = { myorders: [] }, action) => {
    switch (action.type) {
      case MY_ORDERS_REQUEST:
      case CANCEL_ORDER_REQUEST:
        return {
          loading: true,
        };
      case CANCEL_ORDER_SUCCESS:
        const updatedOrders = state?.myorders?.map((order) =>
          order._id === action.payload
            ? { ...order, orderStatus: 'Cancelled' }
            : order
        );
  
        return {
          ...state,
          loading: false,
          myorders: updatedOrders,
        };
      case MY_ORDERS_SUCCESS:
        return {
          loading: false,
          myorders: action.payload,
        };
  
      case MY_ORDERS_FAIL:
      case CANCEL_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
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
  