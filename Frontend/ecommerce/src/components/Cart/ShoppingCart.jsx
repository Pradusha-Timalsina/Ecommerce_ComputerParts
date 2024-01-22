import React, { Fragment } from "react";
import "./ShoppingCart.css";
import Navbar from "../homepage/Navbar";
import ProductCart from "./ProductCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const ShoppingCart = () => {
  return (
    <Fragment>
      <div className="Container">
        <h1 className="Heading">Your Cart</h1>
        <div className="Content">
          <div className="ProductDisplay">
            {/* Product details go here */}
            <p className="ProductColumn">Item</p>
            <p className="ProductColumn">Price(Rs)</p>
            <p className="ProductColumn">Quantity</p>
            <p className="ProductColumn">Total(Rs)</p>
            <p className="ProductColumn">Remove</p>
          </div>

          {/* <div className="OrderSummary">
            <h2>Order Summary</h2>
          </div> */}
        </div>
        <hr className="Separator" />
        <div></div>
        <div className="cartshop">
          <div className="productcart">
            <ProductCart />
          </div>
          <div className="price">
            <p className="cartsubtotal">200 </p>
          </div>
          <div className="increase">
            <div className="addDelete">
              <button>-</button>
              <input type="number" value="1" readOnly />
              <button>+</button>
            </div>
          </div>
          <div className="subprice">
            <p className="totalQ">200</p>
          </div>
          <div className="cartdeleteButton">
            <DeleteOutlineIcon sx={{ color: "red", width: "50px" }} />
          </div>
        </div>
      </div>

      <hr className="Separator" />
    </Fragment>
  );
};

export default ShoppingCart;
