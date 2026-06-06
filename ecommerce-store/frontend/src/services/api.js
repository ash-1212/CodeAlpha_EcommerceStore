import axios from 'axios'

// This is your backend URL — all API calls go here
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Before every request, automatically attach the token if user is logged in
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const { token } = JSON.parse(userInfo)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// AUTH calls
export const registerUser = (userData) => API.post('/auth/register', userData)
export const loginUser = (userData) => API.post('/auth/login', userData)
export const getUserProfile = () => API.get('/auth/profile')

// PRODUCT calls
export const getProducts = () => API.get('/products')
export const getProductById = (id) => API.get(`/products/${id}`)

// ORDER calls
export const createOrder = (orderData) => API.post('/orders', orderData)
export const getMyOrders = () => API.get('/orders/myorders')
export const getOrderById = (id) => API.get(`/orders/${id}`)