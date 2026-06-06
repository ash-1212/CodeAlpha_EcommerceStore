import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await loginUser({ email, password })
      login(data)           // Save user to context and localStorage
      navigate('/')         // Go to home page
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder='you@example.com'
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder='••••••••'
            />
          </div>

          <button
            onClick={handleSubmit}
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p style={styles.footer}>
          Don't have an account? <Link to='/register' style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px',
  },
  title: { fontSize: '26px', color: '#1a1a2e', marginBottom: '6px' },
  subtitle: { color: '#888', marginBottom: '24px' },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#c0392b',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  field: { marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#555' },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '13px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    marginTop: '8px',
  },
  footer: { textAlign: 'center', marginTop: '20px', color: '#666' },
  link: { color: '#e94560', fontWeight: '600' },
}

export default LoginPage