const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')
const productRoutes = require('./src/routes/productRoutes')
const orderRoutes = require('./src/routes/orderRoutes')

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

// All routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running!' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})