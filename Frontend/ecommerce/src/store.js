import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";

const reducer = combineReducers({
  products: productReducer,
});

let initialState = {};

const Middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
