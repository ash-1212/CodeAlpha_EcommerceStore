const Product = require('../models/productModel')

// GET ALL PRODUCTS — anyone can view products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET SINGLE PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// CREATE PRODUCT — only admins can do this
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, brand, countInStock } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      brand,
      countInStock,
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE PRODUCT — only admins
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, brand, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.description = description || product.description
      product.price = price || product.price
      product.image = image || product.image
      product.category = category || product.category
      product.brand = brand || product.brand
      product.countInStock = countInStock || product.countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE PRODUCT — only admins
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await Product.findByIdAndDelete(req.params.id)
      res.json({ message: 'Product removed successfully' })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}