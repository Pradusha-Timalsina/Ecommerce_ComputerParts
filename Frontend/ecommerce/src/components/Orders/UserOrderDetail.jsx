import React, { Fragment, useEffect } from "react";
// import "./userOrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../layout/Loader/Loader";
import { Box, Typography } from "@mui/material";

import { getOrderDetails, clearErrors } from "../../actions/orderAction";

const UserOrderDetails = () => {
  const params = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ maxWidth: 600, m: "auto", p: 2 }}>
          <Typography variant="h4">Order #{order?._id}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Shipping Info
          </Typography>
          <Box
            sx={{ p: 2, border: "1px solid grey", borderRadius: "4px", mb: 2 }}
          >
            <Typography>Name: {order?.user?.name}</Typography>
            <Typography>Phone: {order?.shippingInfo?.contact}</Typography>
            <Typography>
              Address: {order?.shippingInfo?.address},{" "}
              {order?.shippingInfo?.city}, {order?.shippingInfo?.province}
            </Typography>
          </Box>

          <Box
            sx={{ p: 2, border: "1px solid grey", borderRadius: "4px", mb: 2 }}
          >
            <Typography
              sx={{
                color:
                  order?.paymentInfo?.status === "succeeded" ? "green" : "red",
              }}
            >
              {order?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
            </Typography>
            <Typography>Amount: ₹{order?.totalPrice}</Typography>
          </Box>

          <Box sx={{ p: 2, border: "1px solid grey", borderRadius: "4px" }}>
            <Typography
              sx={{
                color: order?.orderStatus === "Delivered" ? "green" : "red",
              }}
            >
              {order?.orderStatus}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Order Items:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {order?.orderItems?.map((item) => (
              <Box
                key={item.product}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <img
                  src={item.image}
                  alt="Product"
                  style={{ width: 50, height: 50 }}
                />
                <Link href={`/product/${item.product}`}>{item.name}</Link>
                <Typography>
                  {item.quantity} X ₹{item.price} = <b>₹{item.price}</b>
                </Typography>
              </Box>
            )) || <Typography>No items in this order.</Typography>}
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default UserOrderDetails;
