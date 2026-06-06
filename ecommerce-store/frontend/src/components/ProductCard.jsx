import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div style={styles.card}>

      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div style={styles.imageBox}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'
            }}
          />
          {product.countInStock === 0 && (
            <div style={styles.outOfStock}>Out of Stock</div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={styles.body}>
        <span style={styles.category}>{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 style={styles.name}>{product.name}</h3>
        </Link>
        <p style={styles.brand}>{product.brand}</p>

        <div style={styles.footer}>
          <span style={styles.price}>${product.price}</span>
          <button
            onClick={handleAdd}
            disabled={product.countInStock === 0}
            style={{
              ...styles.btn,
              backgroundColor: added ? '#2e7d32' : '#e94560',
            }}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>

    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  imageBox: { position: 'relative', overflow: 'hidden' },
  image: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  outOfStock: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
  },
  body: { padding: '16px' },
  category: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#e94560',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  name: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '6px 0 4px',
    lineHeight: '1.3',
  },
  brand: { fontSize: '13px', color: '#888', marginBottom: '14px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '20px', fontWeight: '800', color: '#e94560' },
  btn: {
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
}

export default ProductCard