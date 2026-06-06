import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CartPage = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const { userInfo } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.empty}>
        <p>🛒 Your cart is empty</p>
        <button onClick={() => navigate('/')} style={styles.shopBtn}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div className='container'>
        <h1 style={styles.heading}>Shopping Cart</h1>
        <div style={styles.layout}>

          {/* Cart items list */}
          <div style={styles.items}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.image}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=Img' }}
                />
                <div style={styles.info}>
                  <p style={styles.name}>{item.name}</p>
                  <p style={styles.qty}>Quantity: {item.quantity}</p>
                </div>
                <div style={styles.right}>
                  <p style={styles.price}>${(item.price * item.quantity).toFixed(2)}</p>

                  {/* Quantity controls */}
                  <div style={styles.qtyControls}>
                    <button onClick={() => decreaseQuantity(item._id)} style={styles.qtyBtn}>−</button>
                    <span style={styles.qtyNum}>{item.quantity}</span>
                    <button onClick={() => addToCart(item)} style={styles.qtyBtn}>+</button>
                  </div>

                  <button onClick={() => removeFromCart(item._id)} style={styles.removeBtn}>
                    Remove All
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>{cartTotal > 100 ? 'FREE' : '$10.00'}</span>
            </div>
            <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '18px', borderTop: '1px solid #eee', paddingTop: '12px' }}>
              <span>Total</span>
              <span>${(cartTotal > 100 ? cartTotal : cartTotal + 10).toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} style={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
            <button onClick={clearCart} style={styles.clearBtn}>
              Clear Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { padding: '30px 0' },
  heading: { fontSize: '28px', color: '#1a1a2e', marginBottom: '24px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' },
  items: { display: 'flex', flexDirection: 'column', gap: '16px' },
  item: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  image: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' },
  info: { flex: 1 },
  name: { fontWeight: '600', fontSize: '16px', color: '#1a1a2e' },
  qty: { color: '#888', fontSize: '14px', marginTop: '4px' },
  right: { textAlign: 'right' },
  price: { fontWeight: 'bold', color: '#e94560', fontSize: '16px' },
  removeBtn: {
    background: 'none',
    border: '1px solid #ddd',
    padding: '4px 10px',
    borderRadius: '6px',
    marginTop: '6px',
    fontSize: '13px',
    color: '#888',
    cursor: 'pointer',
  },
  summary: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    height: 'fit-content',
  },
  summaryTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a2e' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' },
  checkoutBtn: {
    width: '100%',
    padding: '13px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    marginTop: '16px',
    cursor: 'pointer',
  },
  clearBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    color: '#888',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  empty: { textAlign: 'center', padding: '80px 20px', fontSize: '20px' },
  shopBtn: {
    marginTop: '16px',
    padding: '12px 24px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    justifyContent: 'flex-end',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNum: {
    fontSize: '15px',
    fontWeight: '600',
    minWidth: '20px',
    textAlign: 'center',
  },
}

export default CartPage