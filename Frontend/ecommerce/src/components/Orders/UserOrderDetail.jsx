import React, { Fragment, useEffect } from 'react';
import './userOrderDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../layout/Loader/Loader';

import {
    getOrderDetails,
  clearErrors,
} from "../../actions/orderAction";

const UserOrderDetails = () => {
  const params = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();


  useEffect(() => {
    if (error) {
 
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch,  error, params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="userOrderDetailsPage">
            <div className="userOrderDetails">
              <h1>Order #{order && order._id}</h1>
              <h2>Shipping Info</h2>
              <div className="userOrderDetailsBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order && order.contact}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order &&
                      `${order.address}, ${order.city}, ${order.province}`}
                  </span>
                </div>
              </div>
              <h2>Payment</h2>
              <div className="userOrderDetailsBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === 'succeeded'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <h2>Order Status</h2>
              <div className="userOrderDetailsBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h2>Order Items:</h2>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}&nbsp;
                      </Link>{' '}
                      <hr />
                      <span>
                        {item.quantity} X ₹{item.price} = <b>₹{item.price}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserOrderDetails;