import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Récupère l'utilisateur depuis localStorage (AuthContext à brancher plus tard)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function handleLogout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
    setMenuOpen(false)
  }

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#7F77DD' : '#8B949E',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: isActive ? 600 : 400,
    padding: '6px 4px',
    borderBottom: isActive ? '2px solid #7F77DD' : '2px solid transparent',
    transition: 'color .15s',
  })

  return (
    <header style={S.header}>
      <nav style={S.nav} aria-label="Navigation principale">

        {/* ── Logo ── */}
        <NavLink to="/" style={S.logo} aria-label="ITConnect — Accueil">
          <svg width="28" height="28" viewBox="0 0 60 60" aria-hidden="true">
            <rect width="60" height="60" rx="12" fill="#185FA5"/>
            <rect x="4" y="4" width="52" height="52" rx="9" fill="#0D1F35"/>
            <line x1="18" y1="30" x2="42" y2="30" stroke="#7F77DD" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="30" cy="30" r="3" fill="#7F77DD" opacity="0.6"/>
            <circle cx="15" cy="30" r="7" fill="#185FA5"/>
            <circle cx="15" cy="27" r="2.5" fill="#A8CFEF"/>
            <path d="M9 37 Q15 33 21 37" fill="#A8CFEF"/>
            <rect x="37" y="22" width="14" height="16" rx="3" fill="#7F77DD"/>
            <rect x="39" y="26" width="10" height="2" rx="1" fill="#EEEDFE"/>
            <rect x="39" y="30" width="10" height="2" rx="1" fill="#EEEDFE"/>
            <circle cx="49" cy="35" r="2" fill="#1D9E75"/>
          </svg>
          <span style={S.logoText}>
            <span style={{ color: '#fff', fontWeight: 700 }}>IT</span>
            <span style={{ color: '#7F77DD', fontWeight: 300 }}>Connect</span>
          </span>
        </NavLink>

        {/* ── Liens desktop ── */}
        <ul style={S.links} role="list">
          <li><NavLink to="/recherche" style={linkStyle}>Rechercher</NavLink></li>
          <li><NavLink to="/pro/1"     style={linkStyle}>Professionnels</NavLink></li>
          {user && (
            <li><NavLink to="/dashboard" style={linkStyle}>Mon espace</NavLink></li>
          )}
        </ul>

        {/* ── Actions desktop ── */}
        <div style={S.actions}>
          {user ? (
            <>
              <span style={S.userBadge}>
                {user.prenom?.[0]}{user.nom?.[0]}
              </span>
              <span style={S.userName}>{user.prenom}</span>
              <button onClick={handleLogout} style={S.btnOutline}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <NavLink to="/connexion"  style={S.btnOutline}>Connexion</NavLink>
              <NavLink to="/inscription" style={S.btnPrimary}>Inscription</NavLink>
            </>
          )}
        </div>

        {/* ── Burger mobile ── */}
        <button
          style={S.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span style={{ ...S.burgerLine, transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}/>
          <span style={{ ...S.burgerLine, opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ ...S.burgerLine, transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}/>
        </button>
      </nav>

      {/* ── Menu mobile ── */}
      {menuOpen && (
        <div style={S.mobileMenu} role="dialog" aria-label="Menu mobile">
          <ul style={S.mobileLinks} role="list">
            <li>
              <NavLink to="/recherche" style={S.mobileLink} onClick={() => setMenuOpen(false)}>
                🔍 Rechercher
              </NavLink>
            </li>
            <li>
              <NavLink to="/pro/1" style={S.mobileLink} onClick={() => setMenuOpen(false)}>
                💻 Professionnels
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard" style={S.mobileLink} onClick={() => setMenuOpen(false)}>
                  📊 Mon espace
                </NavLink>
              </li>
            )}
            <li style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, marginTop: 4 }}>
              {user ? (
                <button onClick={handleLogout} style={{ ...S.mobileLink, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                  🚪 Déconnexion
                </button>
              ) : (
                <>
                  <NavLink to="/connexion"   style={S.mobileLink} onClick={() => setMenuOpen(false)}>🔑 Connexion</NavLink>
                  <NavLink to="/inscription" style={{ ...S.mobileLink, color: '#7F77DD', fontWeight: 600 }} onClick={() => setMenuOpen(false)}>✨ Inscription</NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

// ── STYLES ──
const S = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(13,17,23,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  nav: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoText: {
    fontSize: 20,
    letterSpacing: '-0.3px',
  },
  links: {
    display: 'flex',
    gap: 28,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flex: 1,
    // masqué sur mobile via mediaQuery simulée
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  btnPrimary: {
    padding: '8px 20px',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  btnOutline: {
    padding: '7px 18px',
    background: 'transparent',
    color: '#C9D1D9',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 8,
    fontWeight: 500,
    fontSize: 13,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  userBadge: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
  },
  userName: {
    fontSize: 13,
    color: '#C9D1D9',
    fontWeight: 500,
  },
  burger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 6,
    marginLeft: 'auto',
  },
  burgerLine: {
    display: 'block',
    width: 22,
    height: 2,
    background: '#C9D1D9',
    borderRadius: 2,
    transition: 'transform .2s, opacity .2s',
  },
  mobileMenu: {
    background: '#0D1117',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    padding: '16px 24px 24px',
  },
  mobileLinks: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  mobileLink: {
    display: 'block',
    padding: '12px 8px',
    color: '#C9D1D9',
    textDecoration: 'none',
    fontSize: 15,
    borderRadius: 8,
  },
}
