const express = require("express");
const {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  getCategoryProduct,
} = require("../controller/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      return;
    }
    callback(undefined, true);
  },
});

router.post("/create/category", upload.single("image"), createCategory);

// Delete a category by ID
router
  .route("/category/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

// Get all categories
router.route("/category/all").get(getAllCategory);

// Get a single category by ID
router.route("/category/:id").get(getOneCategory);

router.route("/category/products/:cat").get(getCategoryProduct);

module.exports = router;
