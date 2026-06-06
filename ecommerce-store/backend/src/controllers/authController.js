const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Helper function: creates a JWT token for a user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// REGISTER
const registerUser = async (req, res) => {
  try {
    console.log('Step 1 - Request received:', req.body)

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      console.log('Step 2 - Missing fields!')
      return res.status(400).json({ message: 'Please fill all fields' })
    }

    console.log('Step 2 - Checking if user exists...')
    const userExists = await User.findOne({ email })

    if (userExists) {
      console.log('Step 3 - User already exists!')
      return res.status(400).json({ message: 'User already exists' })
    }

    console.log('Step 3 - Creating user...')
    const user = await User.create({ name, email, password })

    console.log('Step 4 - User created successfully!')
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.log('ERROR:', error.message)
    res.status(500).json({ message: error.message })
  }
}

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.log('LOGIN ERROR:', error.message)
    res.status(500).json({ message: error.message })
  }
}

// GET PROFILE
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.log('PROFILE ERROR:', error.message)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { registerUser, loginUser, getUserProfile }