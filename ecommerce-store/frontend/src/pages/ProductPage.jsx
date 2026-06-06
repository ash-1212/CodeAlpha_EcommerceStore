import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id)
        setProduct(data)
        setLoading(false)
      } catch {
        setError('Product not found')
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return <p style={styles.center}>Loading product...</p>
  if (error) return <p style={styles.center}>{error}</p>

  return (
    <div style={styles.page}>
      <div className='container'>

        {/* Back button */}
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Products
        </button>

        <div style={styles.layout}>

          {/* Product Image */}
          <div style={styles.imageBox}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x400?text=No+Image'
              }}
            />
          </div>

          {/* Product Info */}
          <div style={styles.info}>
            <h1 style={styles.name}>{product.name}</h1>
            <p style={styles.brand}>{product.brand} · {product.category}</p>
            <p style={styles.price}>${product.price}</p>
            <p style={styles.description}>{product.description}</p>

            <div style={styles.stockRow}>
              <span style={{
                ...styles.stockBadge,
                backgroundColor: product.countInStock > 0 ? '#e8f5e9' : '#ffebee',
                color: product.countInStock > 0 ? '#2e7d32' : '#c62828',
              }}>
                {product.countInStock > 0
                  ? `✅ In Stock (${product.countInStock} left)`
                  : '❌ Out of Stock'}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              style={{
                ...styles.addBtn,
                backgroundColor: added ? '#2e7d32' : '#e94560',
              }}
            >
              {added ? '✅ Added to Cart!' : 'Add to Cart'}
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
  backBtn: {
    background: 'none',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '6px',
    marginBottom: '24px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#555',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start',
  },
  imageBox: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  name: { fontSize: '28px', color: '#1a1a2e', fontWeight: 'bold' },
  brand: { fontSize: '15px', color: '#888' },
  price: { fontSize: '32px', color: '#e94560', fontWeight: 'bold' },
  description: { fontSize: '16px', color: '#555', lineHeight: '1.6' },
  stockRow: { display: 'flex' },
  stockBadge: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  addBtn: {
    padding: '14px 28px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
    marginTop: '8px',
  },
}

export default ProductPage