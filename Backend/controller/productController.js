const Product = require("../models/productModel");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { ratingClasses } = require("@mui/material");
const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  const uri = parser.format(extName, file.buffer);
  return uri;
};

// Create Product --Admin

exports.createProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    let images = req.files;
    console.log(images);
    //const imageData = getDataUri(image);

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = getDataUri(images[i]);
      const result = await cloudinary.v2.uploader.upload(imageData.content, {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Get All Product

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 3;
  const productsCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await ApiFeature.query;

  res.status(200).json({
    success: true,
    products,
    resultPerPage,
    productsCount,
  });
});

// Get All product-- Home page
exports.getAllProductHome = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 4;
  const productsCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await ApiFeature.query;

  res.status(200).json({
    success: true,
    products,
    resultPerPage,
    productsCount,
  });
});

//Get All Product (Admin)

exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update Product --Admin route
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.files;
  }
  console.log(images);
  if (images.length > 0) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = getDataUri(images[i]);
      const result = await cloudinary.v2.uploader.upload(imageData.content, {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json("Updated");
});

//Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //Deleting Images from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

//Creating new review of updating the existing review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  console.log(productId);
  const product = await Product.findById(productId);

  // Now proceed with accessing product properties
  console.log(product);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//add stock of a product
exports.updateProductStock = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // Update stock
    const stock = req.body.stock;

    if (isNaN(stock)) {
      return res.status(400).json({ error: "Invalid stock value" });
    }

    const oldStock = product.stock;
    product.stock = product.stock + stock;

    // Add stock record to history
    product.stock_history.push({
      quantity: req.body.stock,
      date: Date.now(),
    });

    const stockUpdateHistory = product.stock_history.filter(
      (record) => record.quantity === stock
    );

    // Set the user field to the ID of the currently authenticated user
    product.user = req.user._id;

    await product.save();

    // Construct the response object
    const response = {
      id: product._id,
      name: product.name,
      stock: product.stock,
      oldStock: oldStock,
      stockUpdateHistory: stockUpdateHistory,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
