import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../layout/Loader/Loader';
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Button } from '@mui/material';
import './updateorder.css';

export const UpdateOrder = () => {
    const dispatch = useDispatch();

    const params = useParams();
  
    const [status, setStatus] = useState('');
  
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
  
    const orderUpdateHandler = (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.set('status', status);
      dispatch(updateOrder(params.id, formdata));
    };
  
    const userName = `${order && order.firstName}`;
    const userContact = `${order && order.contact}`;
    const userAddress = `${order && order.address} ${order && order.city} ${
      order && order.province
    }`;
  
    useEffect(() => {
      if (error) {
  
        dispatch(clearErrors());
      }
      if (updateError) {
   
        dispatch(clearErrors());
      }
      if (isUpdated) {

        dispatch({ type: UPDATE_ORDER_RESET });
      }
  
      dispatch(getOrderDetails(params.id));
    }, [dispatch, alert, error, params.id, isUpdated, updateError]);
  
    return (
        <Fragment>
          <div className="dashboard">
            {/* <LeftSidebar /> */}
            <div className="newProductContainer">
              {loading ? (
                <Loader />
              ) : (
                <div
                  className="updateOrderPage"
                  style={{
                    display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
                  }}
                >
                  <div>
                    <div className="updateshippingArea">
                      <h2>Shipping Info</h2>
                      <div className="updateorderDetailsBox">
                        <div>
                          <p>Name:</p>
                          <span>{userName}</span>
                        </div>
                        <div>
                          <p>Contact:</p>
                          <span>{userContact}</span>
                        </div>
                        <div>
                          <p>Address:</p>
                          <span>{userAddress}</span>
                        </div>
                      </div>
    
                      <h2>Payment</h2>
                      <div className="orderDetailsContainerBox">
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
    
                        <div className="amountContainer">
                          <p>Amount:</p>
                          <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                      </div>
    
                      <h2>Order Status</h2>
                      <div className="orderDetailsContainerBox">
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
                    <div className="confirmCartItems">
                      <h2>Your Cart Items:</h2>
                      <div className="confirmCartItemsContainer">
                        {order.orderItems &&
                          order.orderItems.map((item) => (
                            <div key={item.product}>
                              <img src={item.image} alt="Product" />
                              <Link
                                to={`/product/${item.product}`}
                                style={{ textDecoration: 'none' }}
                              >
                                {item.name}
                              </Link>{' '}
                              <span>
                                {item.quantity} X Rs.{item.price} ={' '}
                                <b>Rs. {item.price}</b>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    style={{
                      display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                    }}
                  >
                    <form className="updateOrderForm" onSubmit={orderUpdateHandler}>
                      <h1>Process Order</h1>
    
                      <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Action</option>
                          {order.orderStatus === 'Processing' && (
                            <option value="Shipped">Shipped</option>
                          )}
    
                          {order.orderStatus === 'Shipped' && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>
    
                      <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={
                          loading ? true : false || status === '' ? true : false
                        }
                      >
                        Process
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      );
    };
    

