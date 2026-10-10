import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { userInfo, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>

        {/* Logo */}
        <Link to='/' style={styles.logo}>
          <span style={styles.logoIcon}>🛒</span>
          <span style={styles.logoText}>Shop<span style={styles.logoAccent}>Now</span></span>
        </Link>

       <div style={styles.centerLinks}>
  <Link to='/' style={styles.navLink}>Home</Link>
  <Link to='/about' style={styles.navLink}>About</Link>
  <Link to='/contact' style={styles.navLink}>Contact</Link>
</div>

        {/* Right side */}
        <div style={styles.rightLinks}>

          {/* Cart */}
          <Link to='/cart' style={styles.cartBtn}>
            <span>🛍️</span>
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={styles.badge}>{cartCount}</span>
            )}
          </Link>

          {userInfo ? (
            <div style={styles.userArea}>
              <span style={styles.greeting}>Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.authLinks}>
              <Link to='/login' style={styles.loginBtn}>Login</Link>
              <Link to='/register' style={styles.registerBtn}>Register</Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    padding: '0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '68px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  },
  logoIcon: { fontSize: '24px' },
  logoText: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  logoAccent: { color: '#e94560' },
  centerLinks: { display: 'flex', gap: '24px' },
  navLink: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '15px',
    fontWeight: '500',
    padding: '6px 0',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  rightLinks: { display: 'flex', alignItems: 'center', gap: '16px' },
  cartBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#fff',
    fontSize: '15px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '8px 16px',
    borderRadius: '20px',
    position: 'relative',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#e94560',
    color: '#fff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  userArea: { display: 'flex', alignItems: 'center', gap: '12px' },
  greeting: { color: 'rgba(255,255,255,0.8)', fontSize: '14px' },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#e94560',
    border: '1px solid #e94560',
    padding: '7px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
  },
  authLinks: { display: 'flex', gap: '10px' },
  loginBtn: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '14px',
    padding: '7px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.3)',
    fontWeight: '500',
  },
  registerBtn: {
    backgroundColor: '#e94560',
    color: '#fff',
    fontSize: '14px',
    padding: '7px 16px',
    borderRadius: '20px',
    fontWeight: '600',
    border: 'none',
  },
}

export default Navbar