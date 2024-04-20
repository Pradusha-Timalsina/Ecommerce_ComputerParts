import React, { Fragment } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './success.css';
import { Link } from 'react-router-dom';
import CheckoutSteps from "../Cart/Shipping/CheckoutStep";

const Success = () => {
  return (
    <Fragment>
      {' '}
      <CheckoutSteps activeStep={2} />
      <div className="successOrder">
        <CheckCircleIcon />
        <p>Your order has been placed successfully</p>
        <Link to="/user/profile" style={{ textDecoration: 'none' }}>
          <button>View Orders</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Success;