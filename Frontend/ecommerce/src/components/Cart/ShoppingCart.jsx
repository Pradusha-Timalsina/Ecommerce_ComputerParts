import React, { Fragment } from "react";
import "./ShoppingCart.css";
import Footer from "../Footer/Footer"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { removeItemsFromCart, addItemsToCart } from "../../actions/cartAction";
import ProductCart from "./ProductCart";
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkOutHandler = () => {
    if (user) {
      if (user.role === "admin") {
        // alert.error("You are not authorized to order items.");
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
      {cartItems.length === 0 ? (
        <div className="noItemInCart">
          <RemoveShoppingCartIcon />

          <p>No Product in Your Cart</p>
          <Link to="/products/page">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="top">
            <Link to="/">
              <ArrowBackIosIcon />
              <button className="shopbutton">More Shopping</button>
            </Link>
          </div>
          <div className="cartContainer">
            <div className="cartheading">
              <p>Product</p>
              <p>Quantity</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartshop" key={item.product}>
                  <ProductCart item={item} deleteCartItems={deleteCartItems} />
                  <div className="addDelete">
                    <button
                      onClick={() => decreaseQty(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartsubtotal">
                    {`Rs ${item.quantity * item.price}`}{" "}
                  </p>
                  <p
                    onClick={() => deleteCartItems(item.product)}
                    className="cartdeleteButton"
                  >
                    <DeleteOutlineIcon sx={{ color: "red", width: "50px" }} />
                  </p>
                </div>
              ))}

            <div className="cartTotalGross">
              <div></div>
              <div className="cartTotalGrossBox">
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.reduce(
                  (tot, item) => tot + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>

              <div className="checkoutBTN">
                <button onClick={checkOutHandler}>CheckOut</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      <Footer/>
    </Fragment>
  );
};

export default ShoppingCart;