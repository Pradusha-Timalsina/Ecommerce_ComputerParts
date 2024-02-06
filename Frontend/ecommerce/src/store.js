import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
  newProduct: newProductReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const Middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
