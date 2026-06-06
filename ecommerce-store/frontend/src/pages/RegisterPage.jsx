import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const [name, setName] = useState('')
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
      const { data } = await registerUser({ name, email, password })
      login(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join us today — it's free!</p>

        {error && <p style={styles.error}>{error}</p>}

        <div>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder='Your name'
            />
          </div>
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
              placeholder='Min 6 characters'
            />
          </div>
          <button onClick={handleSubmit} style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </div>

        <p style={styles.footer}>
          Already have an account? <Link to='/login' style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px' },
  title: { fontSize: '26px', color: '#1a1a2e', marginBottom: '6px' },
  subtitle: { color: '#888', marginBottom: '24px' },
  error: { backgroundColor: '#ffe0e0', color: '#c0392b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' },
  field: { marginBottom: '16px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#555' },
  input: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' },
  button: { width: '100%', padding: '13px', backgroundColor: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', marginTop: '8px' },
  footer: { textAlign: 'center', marginTop: '20px', color: '#666' },
  link: { color: '#e94560', fontWeight: '600' },
}

export default RegisterPage