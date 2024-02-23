import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  productReducer,
  productDetailsReducer,
  productsReducer,
} from "./reducers/productReducer";
import { forgotPasswordReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { profileReducer } from "./reducers/userReducer";
import {
  categoryReducers,
  categoryUDReducer,
  createCategoryReducer,
} from "./reducers/categoryReducer";
import { productStockReducer } from "./reducers/stockReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  stock: productStockReducer,
  user: userReducer,
  cart: cartReducer,
  newProduct: newProductReducer,
  product: productReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  categories: categoryReducers,
  createCategory: createCategoryReducer,
  category: categoryUDReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
