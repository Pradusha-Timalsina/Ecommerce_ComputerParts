import React, { useState, useRef, useEffect, Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import "./productdetails.css";
import Navbar from "../homepage/Navbar";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import Alertbar from "../Alert/Alert";
import ReviewCard from "./ReviewCard.jsx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";
import { Loader } from "../../layout/Loader/Loader.jsx";
import { myOrders } from "../../actions/orderAction.js";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [openn, setOpenn] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { myorders } = useSelector((state) => state.myOrders);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
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
  const submitReviewToggle = () => {
    openn ? setOpenn(false) : setOpenn(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    dispatch(myOrders());

    if (reviewError) {
      setMessage("Review error");
      setStatus("error");
      setOpen(true);
      dispatch(clearErrors());
    }

    if (success) {
      setMessage("Review Submitted Successfully");
      setStatus("success");
      setOpen(true);
      dispatch({ type: NEW_REVIEW_RESET });
      window.location.reload();
    }
  }, [dispatch, params.id, reviewError, success]);

  useEffect(() => {
    if (!ordersLoading && myorders) {
      setOrdersLoading(false);
    }
  }, [ordersLoading, myorders]);
  
  const isAdmin = user && user.role === "admin";



  const userHasOrderedProduct = () => {
    if (!myorders || myorders.length === 0) return false;
  
    console.log("myorders:", myorders);
    console.log("params.id:", params.id);
  
    const orderedProduct = myorders.find(order => order.orderItems.some(item => item.product === params.id && order.orderStatus === "Delivered"));
    
    console.log("orderedProduct:", orderedProduct);
  
    return orderedProduct ? true : false;
  };
  // console.log("userHasOrderedProduct():", userHasOrderedProduct());

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
            <p>({product.numOfReviews} Reviews)</p>
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
            {!isAdmin && userHasOrderedProduct() && (
              <button onClick={submitReviewToggle} className="submitReview">
                Give Review
              </button>
            )}
          </div>
          <Alertbar
            message={message}
            status={status}
            open={open}
            handleClose={handleClose}
          />
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={openn}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
};

export default ProductDetails;
