import { useState, useEffect } from 'react'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts()
        setProducts(data)
        setLoading(false)
      } catch {
        setError('Failed to load products')
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroTag}>🔥 New Arrivals</p>
          <h1 style={styles.heroTitle}>Find Your Perfect<br />
            <span style={styles.heroAccent}>Style Today</span>
          </h1>
          <p style={styles.heroSub}>
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div style={styles.section}>
        <div className='container'>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Latest Products</h2>
            <p style={styles.sectionSub}>{products.length} products available</p>
          </div>

          {loading && (
            <div style={styles.center}>
              <p style={styles.loadingText}>Loading products...</p>
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '80px 24px',
    textAlign: 'center',
  },
  heroContent: { maxWidth: '600px', margin: '0 auto' },
  heroTag: {
    display: 'inline-block',
    backgroundColor: 'rgba(233,69,96,0.2)',
    color: '#e94560',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '16px',
    border: '1px solid rgba(233,69,96,0.3)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#fff',
    lineHeight: '1.2',
    marginBottom: '16px',
  },
  heroAccent: { color: '#e94560' },
  heroSub: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '32px',
  },
  section: { padding: '48px 0' },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  sectionTitle: { fontSize: '26px', fontWeight: '700', color: '#1a1a2e' },
  sectionSub: { color: '#888', fontSize: '14px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '24px',
  },
  center: { textAlign: 'center', padding: '60px' },
  loadingText: { color: '#888', fontSize: '16px' },
  error: { textAlign: 'center', color: '#e94560', padding: '40px' },
}

export default HomePage