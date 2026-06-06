import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderPage from './pages/OrderPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order/:id' element={<OrderPage />} />
          <Route path='/about' element={<AboutPage />} />
<Route path='/contact' element={<ContactPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App