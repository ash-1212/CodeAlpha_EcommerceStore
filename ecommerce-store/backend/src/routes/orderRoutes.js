const express = require('express')
const router = express.Router()
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
} = require('../controllers/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

// All order routes require login
router.post('/', protect, createOrder)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)

// Admin only
router.get('/', protect, admin, getAllOrders)

module.exports = router