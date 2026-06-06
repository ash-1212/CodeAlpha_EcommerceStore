const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    // Who placed this order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // List of products in this order
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',   // Links back to the Product collection
        },
      },
    ],

    // Where to deliver
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },

    // Money details
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    // Status tracking
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order