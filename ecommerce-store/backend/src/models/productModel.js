const mongoose = require('mongoose')

// This defines what a "Review" looks like (nested inside a product)
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,  // Links to a User in our database
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
)

// This defines what a "Product" looks like in our database
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,      // How many are available in the warehouse
    },
    reviews: [reviewSchema],   // An array of reviews inside each product
    numReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product