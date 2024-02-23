const mongoose = require("mongoose");
const stockHistoryItemSchema = require("./stockHistoryItemSchema");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please Enter product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exeed 5 characters"],
    default: 0,
  },

  stock_history: [stockHistoryItemSchema],

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  //Product Kasle banako vanerw tha paunako lagi
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAT: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
