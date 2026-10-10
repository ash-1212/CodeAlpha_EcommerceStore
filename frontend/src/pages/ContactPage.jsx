import { useState } from 'react'

const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!name || !email || !message) return
    setSent(true)
    setName('')
    setEmail('')
    setMessage('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Contact <span style={styles.accent}>Us</span></h1>
        <p style={styles.heroSub}>We'd love to hear from you. Send us a message!</p>
      </div>

      <div className='container'>
        <div style={styles.layout}>

          {/* Contact Info */}
          <div style={styles.infoBox}>
            <h2 style={styles.infoTitle}>Get In Touch</h2>
            <p style={styles.infoSub}>
              Have a question about your order or our products?
              Our team is here to help you.
            </p>

            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>📧</span>
              <div>
                <p style={styles.infoLabel}>Email</p>
                <p style={styles.infoValue}>support@shopnow.com</p>
              </div>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>📞</span>
              <div>
                <p style={styles.infoLabel}>Phone</p>
                <p style={styles.infoValue}>+92 300 1234567</p>
              </div>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>📍</span>
              <div>
                <p style={styles.infoLabel}>Address</p>
                <p style={styles.infoValue}>Karachi, Pakistan</p>
              </div>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoIcon}>🕐</span>
              <div>
                <p style={styles.infoLabel}>Working Hours</p>
                <p style={styles.infoValue}>Mon - Sat: 9am to 6pm</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.formBox}>
            <h2 style={styles.formTitle}>Send a Message</h2>

            {sent && (
              <div style={styles.successMsg}>
                ✅ Message sent successfully! We will get back to you soon.
              </div>
            )}

            <div style={styles.field}>
              <label style={styles.label}>Your Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder='John Doe'
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder='you@example.com'
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.textarea}
                placeholder='How can we help you?'
                rows={5}
              />
            </div>

            <button onClick={handleSubmit} style={styles.sendBtn}>
              Send Message →
            </button>
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
  heroTitle: { fontSize: '42px', fontWeight: '800', color: '#fff', marginBottom: '16px' },
  accent: { color: '#e94560' },
  heroSub: { fontSize: '18px', color: 'rgba(255,255,255,0.7)' },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '32px',
    padding: '60px 0',
    alignItems: 'start',
  },
  infoBox: {
    backgroundColor: '#1a1a2e',
    padding: '40px',
    borderRadius: '16px',
    color: '#fff',
  },
  infoTitle: { fontSize: '22px', fontWeight: '700', marginBottom: '12px' },
  infoSub: { color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' },
  infoItem: { display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px' },
  infoIcon: { fontSize: '24px', marginTop: '2px' },
  infoLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  infoValue: { fontSize: '15px', color: '#fff', fontWeight: '500' },
  formBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  formTitle: { fontSize: '22px', fontWeight: '700', color: '#1a1a2e', marginBottom: '24px' },
  successMsg: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '14px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontWeight: '500', color: '#555', fontSize: '14px' },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  sendBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
  },
}

export default ContactPage