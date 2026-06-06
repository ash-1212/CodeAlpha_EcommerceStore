import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrderById } from '../services/api'

const OrderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await getOrderById(id)
        setOrder(data)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  if (loading) return <p style={styles.center}>Loading order...</p>
  if (!order) return <p style={styles.center}>Order not found</p>

  return (
    <div style={styles.page}>
      <div className='container'>

        {/* Success Banner */}
        <div style={styles.successBanner}>
          <div style={styles.checkIcon}>✅</div>
          <h1 style={styles.successTitle}>Order Placed Successfully!</h1>
          <p style={styles.orderId}>Order ID: <strong>{order._id}</strong></p>
        </div>

        <div style={styles.layout}>

          {/* Order Items */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🛍️ Items Ordered</h2>
            {order.orderItems.map((item, index) => (
              <div key={index} style={styles.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.itemImg}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/60' }}
                />
                <span style={styles.itemName}>{item.name}</span>
                <span style={styles.itemQty}>x{item.quantity}</span>
                <span style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div>
            {/* Shipping Info */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>📦 Shipping Address</h2>
              <p style={styles.infoText}>{order.shippingAddress.address}</p>
              <p style={styles.infoText}>{order.shippingAddress.city}</p>
              <p style={styles.infoText}>{order.shippingAddress.country}</p>
            </div>

            {/* Price Summary */}
            <div style={{ ...styles.card, marginTop: '20px' }}>
              <h2 style={styles.cardTitle}>💰 Payment Summary</h2>
              <div style={styles.summaryRow}>
                <span>Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice}`}</span>
              </div>
              <div style={{ ...styles.summaryRow, fontWeight: 'bold', fontSize: '18px', borderTop: '1px solid #f0f0f0', paddingTop: '12px', marginTop: '8px' }}>
                <span>Total</span>
                <span style={{ color: '#e94560' }}>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={() => navigate('/')} style={styles.shopBtn}>
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { padding: '30px 0' },
  center: { textAlign: 'center', padding: '60px', fontSize: '18px' },
  successBanner: { textAlign: 'center', backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '32px' },
  checkIcon: { fontSize: '48px', marginBottom: '12px' },
  successTitle: { fontSize: '28px', color: '#1a1a2e', marginBottom: '8px' },
  orderId: { color: '#888', fontSize: '14px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' },
  card: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  cardTitle: { fontSize: '17px', fontWeight: '700', color: '#1a1a2e', marginBottom: '20px' },
  item: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f5f5f5' },
  itemImg: { width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' },
  itemName: { flex: 1, fontSize: '14px', color: '#333' },
  itemQty: { color: '#888', fontSize: '14px' },
  itemPrice: { fontWeight: '700', color: '#1a1a2e' },
  infoText: { color: '#555', fontSize: '15px', marginBottom: '6px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' },
  shopBtn: { width: '100%', marginTop: '20px', padding: '14px', backgroundColor: '#e94560', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
}

export default OrderPage