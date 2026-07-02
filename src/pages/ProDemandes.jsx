import { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../css/ProDemandes.module.css'

// ── Données fictives ──────────────────────────────────────────
// À remplacer par : const { data } = await axios.get('/api/demandes')
// dans un useEffect() une fois l'API branchée.
const DEMANDES_INITIALES = [
  {
    id: 1,
    initiales: 'CG',
    client: 'Claire Girard',
    type: 'Particulier',
    ville: 'Sens',
    specialite: 'Réseau',
    description: 'Mon réseau Wi-Fi ne fonctionne plus depuis une mise à jour de la box. J\'ai besoin d\'une intervention rapide pour configurer le routeur et vérifier les connexions.',
    statut: 'En attente',
    date: '2 juillet 2026',
  },
  {
    id: 2,
    initiales: 'DS',
    client: 'DataSolutions SAS',
    type: 'Entreprise',
    ville: 'Melun',
    specialite: 'Cybersécurité',
    description: 'Audit de sécurité complet de notre infrastructure (40 postes, serveur interne). Besoin d\'un rapport détaillé avec recommandations et plan de remédiation.',
    statut: 'En attente',
    date: '1 juillet 2026',
  },
  {
    id: 3,
    initiales: 'MB',
    client: 'Manon Bouchard',
    type: 'Particulier',
    ville: 'Montereau',
    specialite: 'Dépannage',
    description: 'Mon ordinateur portable ne démarre plus suite à une mise à jour Windows. Disque dur potentiellement défaillant. Récupération de données urgente.',
    statut: 'En cours',
    date: '28 juin 2026',
  },
  {
    id: 4,
    initiales: 'TL',
    client: 'TechLog Industries',
    type: 'Entreprise',
    ville: 'Auxerre',
    specialite: 'Réseau',
    description: 'Mise en place d\'un VPN sécurisé pour permettre le télétravail de 15 collaborateurs. Configuration des accès et formation des utilisateurs souhaitée.',
    statut: 'En cours',
    date: '25 juin 2026',
  },
  {
    id: 5,
    initiales: 'PG',
    client: 'Pierre Garnier',
    type: 'Particulier',
    ville: 'Melun',
    specialite: 'Installation',
    description: 'Installation et configuration d\'un NAS personnel pour la sauvegarde automatique des données de la famille. Connexion avec les appareils mobiles.',
    statut: 'Terminée',
    date: '20 juin 2026',
  },
  {
    id: 6,
    initiales: 'RL',
    client: 'Résidences du Loing',
    type: 'Entreprise',
    ville: 'Nemours',
    specialite: 'Maintenance',
    description: 'Contrat de maintenance mensuelle pour 8 postes bureautiques. Mises à jour, sauvegardes et support utilisateurs inclus.',
    statut: 'Terminée',
    date: '15 juin 2026',
  },
  {
    id: 7,
    initiales: 'AL',
    client: 'Antoine Leroy',
    type: 'Particulier',
    ville: 'Sens',
    specialite: 'Dépannage',
    description: 'Suppression de virus/malware sur PC familial. L\'ordinateur est très lent et affiche des publicités intempestives.',
    statut: 'Refusée',
    date: '10 juin 2026',
  },
]

const STATUTS = ['Toutes', 'En attente', 'En cours', 'Terminée', 'Refusée']

const BADGE_CLASS = {
  'En attente': styles.badgeEnAttente,
  'En cours':   styles.badgeEnCours,
  'Terminée':   styles.badgeTerminee,
  'Refusée':    styles.badgeRefusee,
}

const TOAST_CLASS = {
  accepter: styles.toastSuccess,
  refuser:  styles.toastRefus,
  terminer: styles.toastTermine,
}

const TOAST_MSG = {
  accepter: '✅ Demande acceptée — mission en cours',
  refuser:  '✖ Demande refusée',
  terminer: '🏁 Mission marquée comme terminée',
}

// ── Composant principal ───────────────────────────────────────
export default function ProDemandes() {
  const [demandes, setDemandes]       = useState(DEMANDES_INITIALES)
  const [filtreStatut, setFiltreStatut] = useState('Toutes')
  const [recherche, setRecherche]     = useState('')
  const [toast, setToast]             = useState(null) // { message, type }

  // ── Filtrage ──
  const demandesFiltrees = useMemo(() => {
    return demandes.filter(d => {
      const matchStatut = filtreStatut === 'Toutes' || d.statut === filtreStatut
      const q = recherche.toLowerCase()
      const matchRecherche = !q
        || d.client.toLowerCase().includes(q)
        || d.description.toLowerCase().includes(q)
        || d.specialite.toLowerCase().includes(q)
        || d.ville.toLowerCase().includes(q)
      return matchStatut && matchRecherche
    })
  }, [demandes, filtreStatut, recherche])

  // ── Compteur par statut ──
  function countStatut(statut) {
    if (statut === 'Toutes') return demandes.length
    return demandes.filter(d => d.statut === statut).length
  }

  // ── Actions ──
  function changerStatut(id, nouveauStatut, type) {
    // À remplacer par : await axios.put(`/api/demandes/${id}/statut`, { statut: nouveauStatut })
    setDemandes(prev =>
      prev.map(d => d.id === id ? { ...d, statut: nouveauStatut } : d)
    )
    afficherToast(TOAST_MSG[type], TOAST_CLASS[type])
  }

  function afficherToast(message, className) {
    setToast({ message, className })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>

        {/* ── En-tête ── */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Mes demandes reçues</h1>
            <p className={styles.subtitle}>Gérez les demandes de vos clients et suivez l'avancement de vos missions</p>
          </div>
        </div>

        {/* ── Filtres ── */}
        <div className={styles.filtersBar}>

          {/* Recherche texte */}
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">🔍</span>
            <input
              type="text"
              placeholder="Rechercher un client, une ville…"
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              className={styles.searchInput}
              aria-label="Rechercher dans les demandes"
            />
          </div>

          {/* Onglets statut */}
          <div className={styles.tabs} role="tablist" aria-label="Filtrer par statut">
            {STATUTS.map(statut => {
              const isActive = filtreStatut === statut
              const count = countStatut(statut)
              return (
                <button
                  key={statut}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFiltreStatut(statut)}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                >
                  {statut}
                  <span className={`${styles.tabCount} ${!isActive ? styles.tabCountDefault : ''}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Compteur résultats ── */}
        <p className={styles.resultsCount}>
          {demandesFiltrees.length} demande{demandesFiltrees.length !== 1 ? 's' : ''}
          {filtreStatut !== 'Toutes' ? ` · ${filtreStatut}` : ''}
          {recherche ? ` · "${recherche}"` : ''}
        </p>

        {/* ── Liste ── */}
        {demandesFiltrees.length > 0 ? (
          <div className={styles.list} role="list">
            {demandesFiltrees.map(d => (
              <article
                key={d.id}
                className={styles.card}
                role="listitem"
                aria-label={`Demande de ${d.client}`}
              >
                {/* Avatar */}
                <div className={styles.cardLeft}>
                  <div className={styles.avatar}>{d.initiales}</div>
                </div>

                {/* Contenu */}
                <div className={styles.cardBody}>
                  <div className={styles.cardTopRow}>
                    <div>
                      <h2 className={styles.clientName}>{d.client}</h2>
                      <p className={styles.clientMeta}>{d.type} · Reçue le {d.date}</p>
                    </div>
                  </div>

                  <p className={styles.description}>{d.description}</p>

                  <div className={styles.cardTags}>
                    <span className={styles.tag}>🔧 {d.specialite}</span>
                    <span className={`${styles.tag} ${styles.tagVille}`}>📍 {d.ville}</span>
                  </div>
                </div>

                {/* Statut + Actions */}
                <div className={styles.cardRight}>
                  <span className={`${styles.badge} ${BADGE_CLASS[d.statut]}`}>
                    {d.statut}
                  </span>

                  <div className={styles.actions}>
                    {d.statut === 'En attente' && (
                      <>
                        <button
                          className={styles.btnAccept}
                          onClick={() => changerStatut(d.id, 'En cours', 'accepter')}
                          aria-label={`Accepter la demande de ${d.client}`}
                        >
                          ✓ Accepter
                        </button>
                        <button
                          className={styles.btnRefuse}
                          onClick={() => changerStatut(d.id, 'Refusée', 'refuser')}
                          aria-label={`Refuser la demande de ${d.client}`}
                        >
                          ✕ Refuser
                        </button>
                      </>
                    )}

                    {d.statut === 'En cours' && (
                      <button
                        className={styles.btnTerminer}
                        onClick={() => changerStatut(d.id, 'Terminée', 'terminer')}
                        aria-label={`Marquer la mission de ${d.client} comme terminée`}
                      >
                        🏁 Marquer terminée
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState} role="status">
            <div className={styles.emptyIcon}>📭</div>
            <p className={styles.emptyTitle}>Aucune demande trouvée</p>
            <p className={styles.emptyText}>
              {recherche
                ? `Aucun résultat pour "${recherche}" dans les demandes ${filtreStatut !== 'Toutes' ? filtreStatut.toLowerCase() + 's' : ''}`
                : `Vous n'avez pas encore de demandes ${filtreStatut !== 'Toutes' ? filtreStatut.toLowerCase() + 's' : ''}`
              }
            </p>
          </div>
        )}
      </div>

      {/* ── Toast notification ── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`${styles.toast} ${toast.className}`}
        >
          {toast.message}
        </div>
      )}

      <Footer />
    </div>
  )
}
