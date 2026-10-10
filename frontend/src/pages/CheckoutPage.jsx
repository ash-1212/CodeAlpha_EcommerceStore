import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import { createOrder } from '../services/api'

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const shippingPrice = cartTotal > 100 ? 0 : 10
  const totalPrice = cartTotal + shippingPrice

  const handlePlaceOrder = async () => {
    if (!address || !city || !country) {
      setError('Please fill in all shipping details')
      return
    }

    setLoading(true)
    setError('')

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: { address, city, country },
        itemsPrice: cartTotal,
        shippingPrice,
        totalPrice,
      }

      const { data } = await createOrder(orderData)
      clearCart()
      navigate(`/order/${data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order')
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/')
    return null
  }

  return (
    <div style={styles.page}>
      <div className='container'>
        <h1 style={styles.heading}>Checkout</h1>

        <div style={styles.layout}>

          {/* LEFT — Shipping Form */}
          <div style={styles.formBox}>
            <h2 style={styles.sectionTitle}>📦 Shipping Details</h2>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.field}>
              <label style={styles.label}>Street Address</label>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={styles.input}
                placeholder='123 Main Street'
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>City</label>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={styles.input}
                placeholder='Karachi'
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Country</label>
              <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={styles.input}
                placeholder='Pakistan'
              />
            </div>

            {/* Order Items Summary */}
            <h2 style={{ ...styles.sectionTitle, marginTop: '32px' }}>🛍️ Your Items</h2>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.orderItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.itemImage}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/60x60' }}
                />
                <span style={styles.itemName}>{item.name}</span>
                <span style={styles.itemQty}>x{item.quantity}</span>
                <span style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT — Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.sectionTitle}>💰 Order Summary</h2>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: shippingPrice === 0 ? '#2e7d32' : '#333' }}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice}`}
              </span>
            </div>
            {shippingPrice === 0 && (
              <p style={styles.freeShipping}>🎉 You qualify for free shipping!</p>
            )}

            <div style={styles.divider} />

            <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              style={styles.placeOrderBtn}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : '✅ Place Order'}
            </button>

            <button
              onClick={() => navigate('/cart')}
              style={styles.backBtn}
            >
              ← Back to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { padding: '30px 0', minHeight: '80vh' },
  heading: { fontSize: '28px', color: '#1a1a2e', marginBottom: '28px', fontWeight: 'bold' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' },
  formBox: { backgroundColor: '#fff', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '20px' },
  error: { backgroundColor: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' },
  field: { marginBottom: '18px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#555', fontSize: '14px' },
  input: { width: '100%', padding: '12px 16px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' },
  orderItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f5f5f5' },
  itemImage: { width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' },
  itemName: { flex: 1, fontSize: '14px', color: '#333', fontWeight: '500' },
  itemQty: { color: '#888', fontSize: '14px' },
  itemPrice: { fontWeight: '700', color: '#1a1a2e', fontSize: '15px' },
  summary: { backgroundColor: '#fff', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: '90px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '14px', color: '#555', fontSize: '15px' },
  freeShipping: { color: '#2e7d32', fontSize: '13px', marginBottom: '12px', backgroundColor: '#e8f5e9', padding: '8px 12px', borderRadius: '6px' },
  divider: { height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' },
  totalRow: { fontWeight: 'bold', fontSize: '20px', color: '#1a1a2e', marginBottom: '20px' },
  placeOrderBtn: { width: '100%', padding: '14px', backgroundColor: '#e94560', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' },
  backBtn: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#888', border: '1px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' },
}

export default CheckoutPage