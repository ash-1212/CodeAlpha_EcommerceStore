const Order = require('../models/orderModel')
const Product = require('../models/productModel')

// CREATE ORDER — logged in users only
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    // Reduce stock for each product ordered
    for (const item of orderItems) {
      const product = await Product.findById(item.product)
      if (product) {
        product.countInStock = product.countInStock - item.quantity
        await product.save()
      }
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET MY ORDERS — returns only the logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET ORDER BY ID
const getOrderById = async (req, res) => {
  try {
    // .populate means: also fetch the user's name and email from the User collection
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET ALL ORDERS — admin only
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders }