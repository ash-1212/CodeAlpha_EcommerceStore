const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// This runs BEFORE protected routes to check if the user is logged in
const protect = async (req, res, next) => {
  let token

  // Check if the request has an Authorization header with a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (remove the word "Bearer ")
      token = req.headers.authorization.split(' ')[1]

      // Verify the token is valid and not expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach the user to the request object (without the password)
      req.user = await User.findById(decoded.id).select('-password')

      next() // Everything is fine, continue to the route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

// Only allows admins to access certain routes
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()  // User is admin, continue
  } else {
    res.status(401).json({ message: 'Not authorized as admin' })
  }
}

module.exports = { protect, admin }