import React, { Fragment } from "react";
import "./ShoppingCart.css";

import ProductCart from "./ProductCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { removeItemsFromCart, addItemsToCart } from "../../actions/cartAction";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const deleteFromCart = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkoutHandler = () => {
    if (user) {
      if (user.role === "admin") {
        alert.error("You are not authorized to order items.");
        return;
      }
      navigate("/shipping");
    } else {
      // alert.error('Please Login to access this resouces');
      navigate("/login");
    }
  };
  return (
    <Fragment>
      {" "}
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/productspage">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="Container">
            <h1 className="Heading">Your Cart</h1>
            {/* <div className="Content"> */}
            <div className="ProductDisplay">
              {/* Product details go here */}
              <p className="ProductColumn">Item</p>
              <p className="ProductColumn">Price(Rs)</p>
              <p className="ProductColumn">Quantity</p>

              <p className="ProductColumn">Remove</p>
            </div>

            {/* <div className="OrderSummary">
            <h2>Order Summary</h2>
          </div> */}
            {/* </div> */}
            <hr className="Separator" />
            {/* <div></div> */}
            <div className="cartshop">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="productcart" key={item.product}>
                    <ProductCart item={item} />
                  </div>
                ))}

              <div className="price">
                {cartItems &&
                  cartItems.map((item) => (
                    <p className="cartsubtotal">{item.price}</p>
                  ))}
              </div>
              <div className="increase">
                {cartItems &&
                  cartItems.map((item) => (
                    <div className="addDelete">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  ))}
              </div>
              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartdeleteButton">
                    <DeleteOutlineIcon
                      sx={{ color: "red", width: "50px" }}
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteFromCart(item.product)}
                    />
                  </div>
                ))}
            </div>
          </div>

          <hr className="Separator" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ShoppingCart;
