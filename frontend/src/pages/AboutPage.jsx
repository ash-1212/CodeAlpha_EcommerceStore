const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>About <span style={styles.accent}>ShopNow</span></h1>
        <p style={styles.heroSub}>
          We are passionate about bringing you the best products at the best prices
        </p>
      </div>

      <div className='container'>

        {/* Mission */}
        <div style={styles.section}>
          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.icon}>🎯</div>
              <h3 style={styles.cardTitle}>Our Mission</h3>
              <p style={styles.cardText}>
                To make quality products accessible to everyone. We believe great
                shopping should be simple, affordable, and enjoyable for all.
              </p>
            </div>
            <div style={styles.card}>
              <div style={styles.icon}>👁️</div>
              <h3 style={styles.cardTitle}>Our Vision</h3>
              <p style={styles.cardText}>
                To become the most trusted e-commerce platform where customers
                always find exactly what they need at prices they love.
              </p>
            </div>
            <div style={styles.card}>
              <div style={styles.icon}>💎</div>
              <h3 style={styles.cardTitle}>Our Values</h3>
              <p style={styles.cardText}>
                Quality, transparency, and customer satisfaction are at the core
                of everything we do. Your trust is our greatest asset.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsBox}>
          <div style={styles.stat}>
            <span style={styles.statNum}>500+</span>
            <span style={styles.statLabel}>Products</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>10K+</span>
            <span style={styles.statLabel}>Happy Customers</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>50+</span>
            <span style={styles.statLabel}>Brands</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNum}>24/7</span>
            <span style={styles.statLabel}>Support</span>
          </div>
        </div>

        {/* Story */}
        <div style={styles.storyBox}>
          <h2 style={styles.storyTitle}>Our Story</h2>
          <p style={styles.storyText}>
            ShopNow was founded with a simple idea — everyone deserves access to
            great products without breaking the bank. Starting as a small online
            store, we have grown into a platform trusted by thousands of customers
            across the country.
          </p>
          <p style={styles.storyText}>
            We carefully curate every product in our catalog, working directly
            with trusted brands and suppliers to ensure quality and authenticity.
            When you shop with us, you can be confident you are getting the real deal.
          </p>
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
  heroTitle: { fontSize: '42px', fontWeight: '800', color: '#fff', marginBottom: '16px' },
  accent: { color: '#e94560' },
  heroSub: { fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' },
  section: { padding: '60px 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  card: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  icon: { fontSize: '40px', marginBottom: '16px' },
  cardTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px' },
  cardText: { color: '#666', lineHeight: '1.7', fontSize: '15px' },
  statsBox: {
    background: 'linear-gradient(135deg, #e94560, #c0392b)',
    borderRadius: '16px',
    padding: '48px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    textAlign: 'center',
    marginBottom: '60px',
  },
  stat: { display: 'flex', flexDirection: 'column', gap: '8px' },
  statNum: { fontSize: '36px', fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  storyBox: {
    backgroundColor: '#fff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '60px',
  },
  storyTitle: { fontSize: '24px', fontWeight: '700', color: '#1a1a2e', marginBottom: '20px' },
  storyText: { color: '#555', lineHeight: '1.8', fontSize: '16px', marginBottom: '16px' },
}

export default AboutPage