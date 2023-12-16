const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");

//Create Product --Admin
exports.createProducts = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//Get All Product

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

//Get Product Details
exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//Update Product --Admin route
exports.updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }
  console.log(req.body);
  product.set({ ...req.body });
  await product.save();
  res.status(200).json({
    success: true,
    product,
  });
};

//Delete product
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};
