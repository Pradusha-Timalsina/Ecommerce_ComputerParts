import React, { useState, useRef, useEffect, Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import "./productdetails.css";
import Navbar from "../homepage/Navbar";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import Alertbar from "../Alert/Alert";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const params = useParams();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

   // for Alertbar of Snackbar

   const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id, quantity));
    setMessage("Item Added to Cart");
      setStatus("success");
      setOpen(true);
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <Fragment>
      <div className="app">
        <div className="details" key={product._id}>
          <div className="big-img">
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    key={item.url}
                    className="carousel-image"
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div className="box">
            <div className="row">
              <h2>{product?.name}</h2>
              <span>Rs.{product?.price}</span>
            </div>
            <p>{product?.description}</p>

            <div className="increase_button">
              <div className="add_and_Delete">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>
            <button
              className="cart"
              disabled={product.stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
          <Alertbar
              message={message}
              status={status}
              open={open}
              handleClose={handleClose}
            />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
