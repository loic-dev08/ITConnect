import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProCard from '../components/ProCard'
import StarRating from '../components/StarRating'

// --- Données fictives (à remplacer par appels API) ---
const PROS_VEDETTE = [
  { id: 1, nom: 'Karim Ndiaye',    specialite: 'Expert réseau & cybersécurité', ville: 'Melun',      note: 5,   avis: 24, initiales: 'KN', dispo: true  },
  { id: 2, nom: 'Lucie Perrin',    specialite: 'Administratrice systèmes',       ville: 'Montereau', note: 4.8, avis: 31, initiales: 'LP', dispo: true  },
  { id: 3, nom: 'Amélie Chevalier',specialite: 'Développeuse React / Node.js',   ville: 'Sens',      note: 4,   avis: 17, initiales: 'AC', dispo: false },
  { id: 4, nom: 'Nina Vallet',     specialite: 'UX Designer & Intégratrice',     ville: 'Melun',     note: 4.9, avis: 19, initiales: 'NV', dispo: true  },
  { id: 5, nom: 'Youssef Driss',   specialite: 'Data Scientist & IA',            ville: 'Auxerre',   note: 4.5, avis: 7,  initiales: 'YD', dispo: true  },
  { id: 6, nom: 'Romain Bernard',  specialite: 'Développeur mobile React Native',ville: 'Montpellier', note: 4.2, avis: 13, initiales: 'RB', dispo: false },
]

const TEMOIGNAGES = [
  { id: 1, auteur: 'Claire Girard',    role: 'Particulier',  ville: 'Sens', note: 5, texte: 'Karim a configuré mon réseau en moins d\'une heure. Service impeccable, je recommande vivement !', initiales: 'CG' },
  { id: 2, auteur: 'Pierre Garnier',   role: 'DataSolutions SAS', ville: 'Melun', note: 5, texte: 'Lucie gère notre parc de 40 postes avec une efficacité remarquable. Partenaire de confiance depuis 2 ans.', initiales: 'PG' },
  { id: 3, auteur: 'Manon Bouchard',   role: 'Particulier',  ville: 'Lunel',     note: 4, texte: 'Amélie a créé mon site vitrine en 3 semaines. Design moderne et livraison dans les délais.', initiales: 'MB' },
]

const CATEGORIES = [
  {
    id: 'professionnel',
    label: 'Professionnel IT',
    icon: '💻',
    desc: 'Techniciens, développeurs, administrateurs systèmes, experts réseau… Inscrivez-vous et trouvez vos prochains clients.',
    cta: 'Créer mon profil pro',
    color: '#185FA5',
    bg: 'rgba(24,95,165,0.12)',
    border: 'rgba(24,95,165,0.35)',
  },
  {
    id: 'entreprise',
    label: 'Entreprise',
    icon: '🏢',
    desc: 'Trouvez rapidement un prestataire IT qualifié pour vos projets ponctuels ou vos besoins en maintenance.',
    cta: 'Trouver un prestataire',
    color: '#1D9E75',
    bg: 'rgba(29,158,117,0.12)',
    border: 'rgba(29,158,117,0.35)',
  },
  {
    id: 'particulier',
    label: 'Particulier',
    icon: '👤',
    desc: 'Besoin de dépannage, d\'installation ou de formation informatique ? Trouvez un pro près de chez vous.',
    cta: 'Trouver de l\'aide',
    color: '#7F77DD',
    bg: 'rgba(127,119,221,0.12)',
    border: 'rgba(127,119,221,0.35)',
  },
]

// --- Composant étoiles inline ---
function Stars({ note }) {
  return (
    <span aria-label={`Note : ${note} sur 5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(note) ? '#BA7517' : '#3a3a3a', fontSize: '14px' }}>★</span>
      ))}
    </span>
  )
}

// --- Page Home ---
export default function Home() {
  const [specialite, setSpecialite] = useState('')
  const [ville, setVille]           = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (specialite) params.set('specialite', specialite)
    if (ville)      params.set('ville', ville)
    navigate(`/recherche?${params.toString()}`)
  }

  return (
    <div style={S.page}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={S.hero} aria-label="Présentation ITConnect">
        {/* Halo décoratif */}
        <div style={S.halo1} aria-hidden="true" />
        <div style={S.halo2} aria-hidden="true" />

        <div style={S.heroInner}>
          {/* Texte gauche */}
          <div style={S.heroText}>
            <span style={S.eyebrow}>Plateforme de mise en relation IT</span>
            <h1 style={S.h1}>
              Connectez-vous aux<br />
              <span style={S.h1Accent}>meilleurs experts IT</span><br />
              près de chez vous
            </h1>
            <p style={S.heroSub}>
              Particuliers, entreprises — trouvez en quelques secondes un professionnel qualifié pour votre dépannage, projet ou maintenance informatique.
            </p>

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} style={S.searchForm} role="search" aria-label="Rechercher un professionnel IT">
              <div style={S.searchRow}>
                <div style={S.searchField}>
                  <span style={S.searchIcon} aria-hidden="true">🔍</span>
                  <input
                    type="text"
                    placeholder="Spécialité (ex : réseau, développeur…)"
                    value={specialite}
                    onChange={e => setSpecialite(e.target.value)}
                    style={S.searchInput}
                    aria-label="Spécialité recherchée"
                  />
                </div>
                <div style={S.searchField}>
                  <span style={S.searchIcon} aria-hidden="true">📍</span>
                  <input
                    type="text"
                    placeholder="Ville (ex : Melun, Sens…)"
                    value={ville}
                    onChange={e => setVille(e.target.value)}
                    style={S.searchInput}
                    aria-label="Ville"
                  />
                </div>
                <button type="submit" style={S.searchBtn}>
                  Rechercher
                </button>
              </div>
            </form>

            {/* CTA secondaires */}
            <div style={S.heroCtas}>
              <button onClick={() => navigate('/inscription')} style={S.ctaPrimary}>
                Créer un compte
              </button>
              <button onClick={() => navigate('/connexion')} style={S.ctaSecondary}>
                Se connecter
              </button>
            </div>
          </div>

          {/* Illustration droite */}
          <div style={S.heroIllus} aria-hidden="true">
            <svg viewBox="0 0 320 280" width="100%" style={{ maxWidth: 340 }}>
              {/* Écran */}
              <rect x="60" y="20" width="200" height="155" rx="16" fill="#185FA5" opacity="0.9"/>
              <rect x="72" y="32" width="176" height="131" rx="10" fill="#0D1F35"/>
              {/* Ligne connexion */}
              <line x1="118" y1="98" x2="202" y2="98" stroke="#7F77DD" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="160" cy="98" r="5" fill="#7F77DD" opacity="0.6"/>
              <circle cx="137" cy="98" r="3" fill="#7F77DD" opacity="0.4"/>
              <circle cx="183" cy="98" r="3" fill="#7F77DD" opacity="0.4"/>
              {/* Nœud user */}
              <circle cx="112" cy="98" r="20" fill="#185FA5"/>
              <circle cx="112" cy="90" r="7" fill="#A8CFEF"/>
              <path d="M95 116 Q112 107 129 116" fill="#A8CFEF"/>
              {/* Nœud serveur */}
              <rect x="186" y="76" width="40" height="44" rx="9" fill="#7F77DD"/>
              <rect x="193" y="85" width="26" height="4" rx="2" fill="#EEEDFE"/>
              <rect x="193" y="93" width="26" height="4" rx="2" fill="#EEEDFE"/>
              <rect x="193" y="101" width="16" height="4" rx="2" fill="#EEEDFE"/>
              <circle cx="222" cy="110" r="5" fill="#1D9E75"/>
              {/* Pied écran */}
              <rect x="146" y="175" width="28" height="14" rx="3" fill="#185FA5"/>
              <rect x="120" y="187" width="80" height="10" rx="5" fill="#1A3A5C"/>
              {/* Stats flottantes */}
              <rect x="10" y="55" width="90" height="38" rx="10" fill="#0D2A1F" stroke="#1D9E75" strokeWidth="1"/>
              <text x="19" y="72" fontSize="10" fill="#1D9E75" fontFamily="system-ui">✓ En ligne</text>
              <text x="19" y="86" fontSize="9" fill="#7abeaa" fontFamily="system-ui">24 professionnels</text>
              <rect x="220" y="160" width="90" height="38" rx="10" fill="#1A1040" stroke="#7F77DD" strokeWidth="1"/>
              <text x="229" y="177" fontSize="10" fill="#9D97E8" fontFamily="system-ui">★ 4.8 / 5</text>
              <text x="229" y="191" fontSize="9" fill="#8888cc" fontFamily="system-ui">Note moyenne</text>
              {/* Bulle notification */}
              <rect x="185" y="20" width="110" height="32" rx="10" fill="#0D1F35" stroke="#185FA5" strokeWidth="1"/>
              <text x="195" y="33" fontSize="9" fill="#A8CFEF" fontFamily="system-ui">💬 Nouvelle demande</text>
              <text x="195" y="45" fontSize="8" fill="#556070" fontFamily="system-ui">il y a 2 minutes</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES ── */}
      <section style={S.section} aria-labelledby="cat-title">
        <div style={S.sectionInner}>
          <h2 id="cat-title" style={S.h2}>Vous êtes…</h2>
          <p style={S.h2Sub}>ITConnect s'adapte à votre profil</p>
          <div style={S.catGrid}>
            {CATEGORIES.map(cat => (
              <div key={cat.id} style={{ ...S.catCard, background: cat.bg, borderColor: cat.border }}>
                <span style={S.catIcon}>{cat.icon}</span>
                <h3 style={{ ...S.catLabel, color: cat.color }}>{cat.label}</h3>
                <p style={S.catDesc}>{cat.desc}</p>
                <button
                  onClick={() => navigate(`/inscription?role=${cat.id}`)}
                  style={{ ...S.catBtn, background: cat.color }}
                >
                  {cat.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROS EN VEDETTE ── */}
      <section style={{ ...S.section, background: '#080D14' }} aria-labelledby="pros-title">
        <div style={S.sectionInner}>
          <h2 id="pros-title" style={S.h2}>Professionnels en vedette</h2>
          <p style={S.h2Sub}>Des experts vérifiés dans votre région</p>
          <div style={S.prosGrid}>
            {PROS_VEDETTE.map(pro => (
              <article
                key={pro.id}
                style={S.proCard}
                onClick={() => navigate(`/pro/${pro.id}`)}
                role="button"
                tabIndex={0}
                aria-label={`Voir le profil de ${pro.nom}`}
                onKeyDown={e => e.key === 'Enter' && navigate(`/pro/${pro.id}`)}
              >
                <div style={S.proCardTop}>
                  <div style={S.proAvatar}>{pro.initiales}</div>
                  <span style={{ ...S.dispoBadge, background: pro.dispo ? 'rgba(29,158,117,0.15)' : 'rgba(100,100,100,0.15)', color: pro.dispo ? '#1D9E75' : '#888' }}>
                    {pro.dispo ? '● Disponible' : '○ Occupé'}
                  </span>
                </div>
                <h3 style={S.proName}>{pro.nom}</h3>
                <p style={S.proSpec}>{pro.specialite}</p>
                <p style={S.proVille}>📍 {pro.ville}</p>
                <div style={S.proFooter}>
                  <Stars note={pro.note} />
                  <span style={S.proNote}>{pro.note}/5 · {pro.avis} avis</span>
                </div>
              </article>
            ))}
          </div>
          <div style={S.centré}>
            <button onClick={() => navigate('/recherche')} style={S.ctaPrimary}>
              Voir tous les professionnels →
            </button>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section style={S.section} aria-labelledby="temoignages-title">
        <div style={S.sectionInner}>
          <h2 id="temoignages-title" style={S.h2}>Ce qu'ils en disent</h2>
          <p style={S.h2Sub}>Des utilisateurs satisfaits partout en région</p>
          <div style={S.temGrid}>
            {TEMOIGNAGES.map(t => (
              <figure key={t.id} style={S.temCard}>
                <div style={S.temHeader}>
                  <div style={S.temAvatar}>{t.initiales}</div>
                  <div>
                    <figcaption style={S.temNom}>{t.auteur}</figcaption>
                    <span style={S.temRole}>{t.role} · {t.ville}</span>
                  </div>
                </div>
                <Stars note={t.note} />
                <blockquote style={S.temTexte}>"{t.texte}"</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={S.ctaSection} aria-label="Appel à l'action">
        <div style={S.halo1} aria-hidden="true" />
        <div style={S.sectionInner}>
          <h2 style={{ ...S.h2, color: '#fff' }}>Prêt à vous connecter ?</h2>
          <p style={{ ...S.h2Sub, color: '#8899aa' }}>Rejoignez des centaines d'utilisateurs qui font confiance à ITConnect</p>
          <div style={S.centré}>
            <button onClick={() => navigate('/inscription')} style={{ ...S.ctaPrimary, fontSize: '15px', padding: '14px 36px' }}>
              Créer mon compte gratuitement
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ── STYLES ──
const S = {
  page: {
    minHeight: '100vh',
    background: '#0D1117',
    color: '#C9D1D9',
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  // Hero
  hero: {
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 24px 60px',
    background: 'linear-gradient(160deg, #0D1117 0%, #0D1F35 60%, #110D2A 100%)',
  },
  halo1: {
    position: 'absolute', top: '-80px', left: '-80px',
    width: 400, height: 400, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(24,95,165,0.25) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  halo2: {
    position: 'absolute', bottom: '-100px', right: '-60px',
    width: 360, height: 360, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(127,119,221,0.2) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroInner: {
    position: 'relative',
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: 48,
    flexWrap: 'wrap',
  },
  heroText: {
    flex: '1 1 400px',
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#7F77DD',
    marginBottom: 16,
    padding: '4px 12px',
    border: '1px solid rgba(127,119,221,0.3)',
    borderRadius: 20,
  },
  h1: {
    fontSize: 'clamp(28px, 4vw, 48px)',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#E6EDF3',
    margin: '0 0 20px',
  },
  h1Accent: {
    background: 'linear-gradient(90deg, #185FA5, #7F77DD)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: 16,
    lineHeight: 1.7,
    color: '#8B949E',
    marginBottom: 32,
    maxWidth: 480,
  },
  heroIllus: {
    flex: '1 1 280px',
    display: 'flex',
    justifyContent: 'center',
  },

  // Search
  searchForm: {
    marginBottom: 28,
  },
  searchRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  searchField: {
    flex: '1 1 180px',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 14,
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 36px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    color: '#C9D1D9',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  },
  searchBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },

  // CTAs hero
  heroCtas: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    padding: '11px 28px',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
  },
  ctaSecondary: {
    padding: '11px 28px',
    background: 'transparent',
    color: '#C9D1D9',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 10,
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
  },

  // Sections
  section: {
    padding: '72px 24px',
    background: '#0D1117',
  },
  sectionInner: {
    maxWidth: 1100,
    margin: '0 auto',
    position: 'relative',
  },
  h2: {
    fontSize: 'clamp(22px, 3vw, 32px)',
    fontWeight: 700,
    color: '#E6EDF3',
    textAlign: 'center',
    margin: '0 0 8px',
  },
  h2Sub: {
    textAlign: 'center',
    color: '#8B949E',
    fontSize: 15,
    marginBottom: 48,
  },
  centré: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },

  // Catégories
  catGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
  },
  catCard: {
    border: '1px solid',
    borderRadius: 16,
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    transition: 'transform .2s',
  },
  catIcon: {
    fontSize: 32,
  },
  catLabel: {
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
  },
  catDesc: {
    fontSize: 13,
    color: '#8B949E',
    lineHeight: 1.6,
    flex: 1,
  },
  catBtn: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    marginTop: 4,
    alignSelf: 'flex-start',
  },

  // Pros en vedette
  prosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: 16,
    marginBottom: 8,
  },
  proCard: {
    background: '#0D1F35',
    border: '1px solid rgba(24,95,165,0.25)',
    borderRadius: 14,
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform .15s, border-color .15s',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  proCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  dispoBadge: {
    fontSize: 10,
    fontWeight: 500,
    padding: '3px 8px',
    borderRadius: 20,
  },
  proName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#E6EDF3',
    margin: 0,
  },
  proSpec: {
    fontSize: 12,
    color: '#8B949E',
    margin: 0,
    lineHeight: 1.4,
  },
  proVille: {
    fontSize: 12,
    color: '#556070',
    margin: 0,
  },
  proFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  proNote: {
    fontSize: 11,
    color: '#8B949E',
  },

  // Témoignages
  temGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
  },
  temCard: {
    background: '#111820',
    border: '1px solid rgba(127,119,221,0.2)',
    borderRadius: 14,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    margin: 0,
  },
  temHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  temAvatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(127,119,221,0.2)',
    color: '#9D97E8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  temNom: {
    fontSize: 13,
    fontWeight: 600,
    color: '#E6EDF3',
    margin: 0,
  },
  temRole: {
    fontSize: 11,
    color: '#556070',
  },
  temTexte: {
    fontSize: 13,
    color: '#8B949E',
    lineHeight: 1.7,
    fontStyle: 'italic',
    margin: 0,
  },

  // CTA final
  ctaSection: {
    padding: '80px 24px',
    background: 'linear-gradient(160deg, #0D1117, #0D1F35)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
}
