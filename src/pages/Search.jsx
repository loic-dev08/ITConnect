import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import styles from '../css/Recherche.module.css'

// ── Données fictives ──────────────────────────────────────────
// À remplacer par : const { data } = await axios.get('/api/professionnels')
const PROS = [
  { id: 1,  initiales: 'LM', nom: 'Larry Max',          specialite: 'Réseau & Cybersécurité',    ville: 'Melun',       note: 5.0, avis: 24, dispo: true  },
  { id: 2,  initiales: 'LP', nom: 'Lucie Perrin',        specialite: 'Administration Systèmes',   ville: 'Montereau',   note: 4.8, avis: 31, dispo: true  },
  { id: 3,  initiales: 'AC', nom: 'Amélie Chevalier',    specialite: 'Développement React/Node',  ville: 'Sens',        note: 4.0, avis: 17, dispo: false },
  { id: 4,  initiales: 'NV', nom: 'Nina Vallet',         specialite: 'UX Design & Intégration',  ville: 'Melun',       note: 4.9, avis: 19, dispo: true  },
  { id: 5,  initiales: 'EC', nom: 'Éric Castel',         specialite: 'Data Science & IA',        ville: 'Auxerre',     note: 4.5, avis: 7,  dispo: true  },
  { id: 6,  initiales: 'RB', nom: 'Romain Bernard',      specialite: 'Développement Mobile',     ville: 'Montpellier', note: 4.2, avis: 13, dispo: false },
  { id: 7,  initiales: 'TM', nom: 'Thomas Mercier',      specialite: 'Réseau & Cybersécurité',   ville: 'Sens',        note: 4.7, avis: 22, dispo: true  },
  { id: 8,  initiales: 'SB', nom: 'Sophie Blanchard',    specialite: 'Administration Systèmes',  ville: 'Auxerre',     note: 4.3, avis: 11, dispo: true  },
  { id: 9,  initiales: 'PL', nom: 'Pierre Lefebvre',     specialite: 'Développement Web',        ville: 'Montereau',   note: 4.6, avis: 8,  dispo: false },
  { id: 10, initiales: 'ML', nom: 'Marie Leclerc',       specialite: 'Support & Dépannage',      ville: 'Melun',       note: 4.1, avis: 35, dispo: true  },
  { id: 11, initiales: 'JD', nom: 'Julien Dupont',       specialite: 'Cloud & DevOps',           ville: 'Paris',       note: 4.8, avis: 16, dispo: true  },
  { id: 12, initiales: 'CR', nom: 'Charlotte Renard',    specialite: 'UX Design & Intégration',  ville: 'Sens',        note: 3.9, avis: 6,  dispo: false },
]

const SPECIALITES = [
  'Toutes les spécialités',
  'Réseau & Cybersécurité',
  'Administration Systèmes',
  'Développement React/Node',
  'Développement Web',
  'Développement Mobile',
  'UX Design & Intégration',
  'Data Science & IA',
  'Cloud & DevOps',
  'Support & Dépannage',
]

const VILLES = [
  'Toutes les villes',
  'Melun',
  'Montereau',
  'Sens',
  'Auxerre',
  'Montpellier',
  'Paris',
]

const NOTES_MIN = [
  { label: 'Toutes les notes', value: 0 },
  { label: '⭐ 3 et plus',    value: 3 },
  { label: '⭐ 4 et plus',    value: 4 },
  { label: '⭐ 4.5 et plus',  value: 4.5 },
]

// ── Composant étoiles ─────────────────────────────────────────
function Stars({ note }) {
  return (
    <span aria-label={`Note : ${note} sur 5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(note) ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </span>
  )
}

// ── Page Recherche ────────────────────────────────────────────
export default function Recherche() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Récupère les paramètres d'URL (venant de la SearchBar de la Home)
  const [specialiteSearch, setSpecialiteSearch] = useState(searchParams.get('specialite') || '')
  const [villeSearch, setVilleSearch]           = useState(searchParams.get('ville') || '')

  // Filtres avancés
  const [filtreSpecialite, setFiltreSpecialite] = useState('Toutes les spécialités')
  const [filtreVille, setFiltreVille]           = useState('Toutes les villes')
  const [filtreDispo, setFiltreDispo]           = useState('tous')
  const [filtreNote, setFiltreNote]             = useState(0)

  // Vue grille ou liste
  const [vue, setVue] = useState('grille')

  // ── Filtrage combiné ──
  const prosFiltres = useMemo(() => {
    return PROS.filter(p => {
      // Recherche texte (spécialité + ville depuis SearchBar)
      const matchSpec = !specialiteSearch
        || p.specialite.toLowerCase().includes(specialiteSearch.toLowerCase())
        || p.nom.toLowerCase().includes(specialiteSearch.toLowerCase())
      const matchVilleSearch = !villeSearch
        || p.ville.toLowerCase().includes(villeSearch.toLowerCase())

      // Filtres avancés
      const matchFiltreSpec  = filtreSpecialite === 'Toutes les spécialités' || p.specialite === filtreSpecialite
      const matchFiltreVille = filtreVille === 'Toutes les villes' || p.ville === filtreVille
      const matchDispo       = filtreDispo === 'tous' || (filtreDispo === 'dispo' ? p.dispo : !p.dispo)
      const matchNote        = p.note >= filtreNote

      return matchSpec && matchVilleSearch && matchFiltreSpec && matchFiltreVille && matchDispo && matchNote
    })
  }, [specialiteSearch, villeSearch, filtreSpecialite, filtreVille, filtreDispo, filtreNote])

  // ── Reset filtres ──
  function resetFiltres() {
    setFiltreSpecialite('Toutes les spécialités')
    setFiltreVille('Toutes les villes')
    setFiltreDispo('tous')
    setFiltreNote(0)
    setSpecialiteSearch('')
    setVilleSearch('')
    setSearchParams({})
  }

  // ── Callback SearchBar ──
  function handleSearch({ specialite, ville }) {
    setSpecialiteSearch(specialite)
    setVilleSearch(ville)
    const params = {}
    if (specialite) params.specialite = specialite
    if (ville)      params.ville = ville
    setSearchParams(params)
  }

  const aFiltresActifs = filtreSpecialite !== 'Toutes les spécialités'
    || filtreVille !== 'Toutes les villes'
    || filtreDispo !== 'tous'
    || filtreNote > 0
    || specialiteSearch
    || villeSearch

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>

        {/* ── En-tête ── */}
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Rechercher un professionnel IT</h1>
          <p className={styles.subtitle}>Trouvez l'expert qu'il vous faut parmi nos professionnels vérifiés</p>
        </div>

        {/* ── Barre de recherche ── */}
        <div className={styles.searchBarWrapper}>
          <SearchBar
            initialSpecialite={specialiteSearch}
            initialVille={villeSearch}
            onSearch={handleSearch}
          />
        </div>

        {/* ── Filtres avancés ── */}
        <div className={styles.filtersRow}>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Spécialité</label>
            <select
              className={styles.filterSelect}
              value={filtreSpecialite}
              onChange={e => setFiltreSpecialite(e.target.value)}
              aria-label="Filtrer par spécialité"
            >
              {SPECIALITES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Ville</label>
            <select
              className={styles.filterSelect}
              value={filtreVille}
              onChange={e => setFiltreVille(e.target.value)}
              aria-label="Filtrer par ville"
            >
              {VILLES.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Disponibilité</label>
            <select
              className={styles.filterSelect}
              value={filtreDispo}
              onChange={e => setFiltreDispo(e.target.value)}
              aria-label="Filtrer par disponibilité"
            >
              <option value="tous">Tous</option>
              <option value="dispo">Disponible uniquement</option>
              <option value="occupe">Occupé uniquement</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Note minimale</label>
            <select
              className={styles.filterSelect}
              value={filtreNote}
              onChange={e => setFiltreNote(Number(e.target.value))}
              aria-label="Filtrer par note minimale"
            >
              {NOTES_MIN.map(n => (
                <option key={n.value} value={n.value}>{n.label}</option>
              ))}
            </select>
          </div>

          {aFiltresActifs && (
            <button className={styles.resetFiltersBtn} onClick={resetFiltres}>
              ↺ Réinitialiser
            </button>
          )}
        </div>

        {/* ── Barre résultats + switch vue ── */}
        <div className={styles.resultsBar}>
          <p className={styles.resultsCount}>
            <strong>{prosFiltres.length}</strong> professionnel{prosFiltres.length !== 1 ? 's' : ''} trouvé{prosFiltres.length !== 1 ? 's' : ''}
          </p>
          <div className={styles.viewToggle} role="group" aria-label="Changer la vue">
            <button
              className={`${styles.viewBtn} ${vue === 'grille' ? styles.viewBtnActive : ''}`}
              onClick={() => setVue('grille')}
              aria-label="Vue grille"
              aria-pressed={vue === 'grille'}
              title="Vue grille"
            >⊞</button>
            <button
              className={`${styles.viewBtn} ${vue === 'liste' ? styles.viewBtnActive : ''}`}
              onClick={() => setVue('liste')}
              aria-label="Vue liste"
              aria-pressed={vue === 'liste'}
              title="Vue liste"
            >☰</button>
          </div>
        </div>

        {/* ── Résultats ── */}
        {prosFiltres.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <p className={styles.emptyTitle}>Aucun professionnel trouvé</p>
            <p className={styles.emptyText}>
              Essayez d'élargir vos critères de recherche ou de modifier les filtres.
            </p>
            <button className={styles.emptyBtn} onClick={resetFiltres}>
              Effacer tous les filtres
            </button>
          </div>
        ) : vue === 'grille' ? (

          /* ── VUE GRILLE ── */
          <div className={styles.grid}>
            {prosFiltres.map(pro => (
              <article
                key={pro.id}
                className={styles.proCard}
                onClick={() => navigate(`/pro/${pro.id}`)}
                role="button"
                tabIndex={0}
                aria-label={`Voir le profil de ${pro.nom}`}
                onKeyDown={e => e.key === 'Enter' && navigate(`/pro/${pro.id}`)}
              >
                <div className={styles.proCardTop}>
                  <div className={styles.avatar}>{pro.initiales}</div>
                  <span className={`${styles.dispoBadge} ${pro.dispo ? styles.dispoOn : styles.dispoOff}`}>
                    {pro.dispo ? '● Disponible' : '○ Occupé'}
                  </span>
                </div>

                <div>
                  <h2 className={styles.proName}>{pro.nom}</h2>
                  <p className={styles.proSpec}>{pro.specialite}</p>
                  <p className={styles.proVille}>📍 {pro.ville}</p>
                </div>

                <div className={styles.proFooter}>
                  <div>
                    <Stars note={pro.note} />
                    <span className={styles.proNote}> {pro.note}/5</span>
                  </div>
                  <span className={styles.proAvis}>{pro.avis} avis</span>
                </div>

                <button
                  className={styles.contactBtn}
                  onClick={e => { e.stopPropagation(); navigate(`/pro/${pro.id}`) }}
                >
                  Voir le profil
                </button>
              </article>
            ))}
          </div>

        ) : (

          /* ── VUE LISTE ── */
          <div className={styles.list}>
            {prosFiltres.map(pro => (
              <article
                key={pro.id}
                className={styles.proRow}
                onClick={() => navigate(`/pro/${pro.id}`)}
                role="button"
                tabIndex={0}
                aria-label={`Voir le profil de ${pro.nom}`}
                onKeyDown={e => e.key === 'Enter' && navigate(`/pro/${pro.id}`)}
              >
                <div className={styles.avatar}>{pro.initiales}</div>

                <div className={styles.proRowBody}>
                  <div>
                    <p className={styles.proRowName}>{pro.nom}</p>
                    <p className={styles.proRowSpec}>{pro.specialite} · 📍 {pro.ville}</p>
                  </div>

                  <div className={styles.proRowMeta}>
                    <span className={styles.proRowNote}>
                      <Stars note={pro.note} /> {pro.note}/5
                    </span>
                    <span className={styles.proRowAvis}>{pro.avis} avis</span>
                  </div>

                  <div className={styles.proRowMeta}>
                    <span className={`${styles.dispoBadge} ${pro.dispo ? styles.dispoOn : styles.dispoOff}`}>
                      {pro.dispo ? '● Disponible' : '○ Occupé'}
                    </span>
                  </div>
                </div>

                <div className={styles.proRowActions}>
                  <button
                    className={styles.contactBtnSm}
                    onClick={e => { e.stopPropagation(); navigate(`/pro/${pro.id}`) }}
                  >
                    Voir le profil →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}
