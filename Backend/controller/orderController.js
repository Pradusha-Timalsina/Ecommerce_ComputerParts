const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");

//Create new Order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, totalPrice } =
    req.body;

  // Decrease stock for each ordered item
  for (const orderItem of orderItems) {
    const product = await Product.findById(orderItem.product);

    if (!product) {
      return next(new ErrorHandler(`Product not found with id ${orderItem.product}`, 404));
    }

    product.stock -= orderItem.quantity;
    await product.save({ validateBeforeSave: false });
  }

  // Create new order
  const tempOrder= {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user?._id,
  };

  const order = await Order.create(tempOrder);

  res.status(201).json({
    success: true,
    order,
  });
});

//get Single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all Orders --> Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update Order Status --> Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Your order has been already delivered", 400));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();

    order.orderItems.forEach(async (ord) => {
      const product = await Product.findById(ord.product);
      product.stock -= ord.quantity;
      await product.save({ validateBeforeSave: false });
    });
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Delete Order --> Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});


// cancelled order
exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this id', 404));
  }

  if (order.orderStatus === 'Cancelled') {
    return next(new ErrorHandler('Order is already cancelled', 400));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Cannot cancel a delivered order', 400));
  }

  // Increment stock for each ordered item
  for (const orderItem of order.orderItems) {
    const product = await Product.findById(orderItem.product);

    if (!product) {
      return next(new ErrorHandler(`Product not found with id ${orderItem.product}`, 404));
    }

    product.stock += orderItem.quantity;
    await product.save({ validateBeforeSave: false });
  }

  order.orderStatus = 'Cancelled';

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

