import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Alertbar from "../Alert/Alert";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    if (!productId) {
      setMessage("Product ID is required to delete a review.");
      setStatus("error");
      setOpen(true);
      return;
    }
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId) {
      dispatch(getAllReviews(productId));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      setMessage(error);
      setStatus("error");
      setOpen(true);
      dispatch(clearErrors());
    }

    if (deleteError) {
      setMessage(deleteError);
      setStatus("error");
      setOpen(true);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      setMessage("Review Deleted Successfully");
      setStatus("success");
      setOpen(true);
      dispatch(getAllReviews(productId));
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <div className="grid-view-product-review">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || productId === ""}
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
        <Alertbar
          message={message}
          status={status}
          open={open}
          handleClose={handleClose}
        />
      </div>
    </Fragment>
  );
};

export default ProductReviews;
