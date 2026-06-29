import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── SearchBar ────────────────────────────────────────────────
// Props :
//   initialSpecialite (string) — valeur pré-remplie spécialité
//   initialVille      (string) — valeur pré-remplie ville
//   onSearch (function)        — callback optionnel (si utilisé
//                                dans Search.jsx pour filtrer
//                                sans navigation)
//   compact  (bool)            — version compacte pour header
// ────────────────────────────────────────────────────────────
export default function SearchBar({
  initialSpecialite = '',
  initialVille = '',
  onSearch = null,
  compact = false,
}) {
  const [specialite, setSpecialite] = useState(initialSpecialite)
  const [ville, setVille]           = useState(initialVille)
  const [focused, setFocused]       = useState(null)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (onSearch) {
      // Mode filtrage local (page Search)
      onSearch({ specialite, ville })
    } else {
      // Mode navigation (Home → Search)
      const params = new URLSearchParams()
      if (specialite.trim()) params.set('specialite', specialite.trim())
      if (ville.trim())      params.set('ville', ville.trim())
      navigate(`/recherche?${params.toString()}`)
    }
  }

  function handleReset() {
    setSpecialite('')
    setVille('')
    if (onSearch) onSearch({ specialite: '', ville: '' })
  }

  const hasValue = specialite.trim() || ville.trim()

  return (
    <form
      onSubmit={handleSubmit}
      style={compact ? S.formCompact : S.form}
      role="search"
      aria-label="Rechercher un professionnel IT"
    >
      {/* ── Champ spécialité ── */}
      <div style={{
        ...S.field,
        ...(focused === 'specialite' ? S.fieldFocused : {}),
        flex: compact ? '1 1 160px' : '1 1 220px',
      }}>
        <span style={S.icon} aria-hidden="true">💻</span>
        <input
          type="text"
          placeholder={compact ? 'Spécialité…' : 'Spécialité (ex : réseau, développeur, sécurité…)'}
          value={specialite}
          onChange={e => setSpecialite(e.target.value)}
          onFocus={() => setFocused('specialite')}
          onBlur={() => setFocused(null)}
          style={S.input}
          aria-label="Spécialité recherchée"
          autoComplete="off"
        />
        {specialite && (
          <button
            type="button"
            onClick={() => setSpecialite('')}
            style={S.clearBtn}
            aria-label="Effacer la spécialité"
          >×</button>
        )}
      </div>

      {/* ── Séparateur ── */}
      <div style={S.separator} aria-hidden="true" />

      {/* ── Champ ville ── */}
      <div style={{
        ...S.field,
        ...(focused === 'ville' ? S.fieldFocused : {}),
        flex: compact ? '1 1 130px' : '1 1 180px',
      }}>
        <span style={S.icon} aria-hidden="true">📍</span>
        <input
          type="text"
          placeholder={compact ? 'Ville…' : 'Ville (ex : Melun, Sens, Auxerre…)'}
          value={ville}
          onChange={e => setVille(e.target.value)}
          onFocus={() => setFocused('ville')}
          onBlur={() => setFocused(null)}
          style={S.input}
          aria-label="Ville"
          autoComplete="off"
        />
        {ville && (
          <button
            type="button"
            onClick={() => setVille('')}
            style={S.clearBtn}
            aria-label="Effacer la ville"
          >×</button>
        )}
      </div>

      {/* ── Boutons ── */}
      <div style={S.btnRow}>
        {hasValue && !compact && (
          <button
            type="button"
            onClick={handleReset}
            style={S.resetBtn}
            aria-label="Réinitialiser la recherche"
          >
            ↺
          </button>
        )}
        <button
          type="submit"
          style={compact ? S.submitBtnCompact : S.submitBtn}
          aria-label="Lancer la recherche"
        >
          {compact ? '🔍' : '🔍 Rechercher'}
        </button>
      </div>
    </form>
  )
}

// ── STYLES ──
const S = {
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: '6px 6px 6px 4px',
    flexWrap: 'wrap',
    maxWidth: 680,
  },
  formCompact: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '4px 4px 4px 4px',
    flexWrap: 'nowrap',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 10,
    transition: 'background .15s',
    minWidth: 0,
  },
  fieldFocused: {
    background: 'rgba(127,119,221,0.1)',
  },
  icon: {
    fontSize: 15,
    flexShrink: 0,
  },
  input: {
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#C9D1D9',
    fontSize: 14,
    width: '100%',
    minWidth: 0,
    fontFamily: 'system-ui, sans-serif',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    color: '#556070',
    fontSize: 18,
    cursor: 'pointer',
    padding: '0 2px',
    lineHeight: 1,
    flexShrink: 0,
  },
  separator: {
    width: 1,
    height: 28,
    background: 'rgba(255,255,255,0.1)',
    flexShrink: 0,
    alignSelf: 'center',
  },
  btnRow: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    padding: '0 2px',
    flexShrink: 0,
  },
  submitBtn: {
    padding: '10px 22px',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'system-ui, sans-serif',
  },
  submitBtnCompact: {
    padding: '8px 12px',
    background: 'linear-gradient(135deg, #185FA5, #7F77DD)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    cursor: 'pointer',
    flexShrink: 0,
  },
  resetBtn: {
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.07)',
    color: '#8B949E',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    fontSize: 16,
    cursor: 'pointer',
  },
}
