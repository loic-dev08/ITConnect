// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      background: '#080D14',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '32px 24px',
      textAlign: 'center',
      color: '#556070',
      fontSize: '13px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>IT</span>
        <span style={{ color: '#7F77DD', fontWeight: 300 }}>Connect</span>
      </div>
      <p style={{ margin: 0 }}>© 2025 ITConnect — Tous droits réservés</p>
      <p style={{ margin: '6px 0 0', fontSize: 11 }}>
        Mise en relation de professionnels IT · Melun · Sens · Auxerre - Montereau  - Montpellier - Bordeaux
      </p>
    </footer>
  )
}