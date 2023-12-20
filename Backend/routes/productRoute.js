const express = require("express");
const {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getAllProducts);

router.route("/product/new").post(createProducts);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

module.exports = router;
