import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../services/api'
import styles from '../css/Recherche.module.css'

export default function Entreprises() {
  const [entreprises, setEntreprises] = useState([])
  const [loading, setLoading]         = useState(true)
  const [erreur, setErreur]           = useState('')
  const [ville, setVille]             = useState('')

  useEffect(() => {
    async function charger() {
      setLoading(true)
      setErreur('')
      try {
        const params = {}
        if (ville) params.ville = ville
        const res = await api.get('/entreprises', { params })
        setEntreprises(res.data.entreprises)
      } catch (err) {
        setErreur('Impossible de charger les entreprises. Réessayez plus tard.')
      } finally {
        setLoading(false)
      }
    }
    charger()
  }, [ville])

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>

        <div className={styles.headerRow}>
          <h1 className={styles.title}>Entreprises partenaires</h1>
          <p className={styles.subtitle}>Découvrez les entreprises qui font confiance à ITConnect</p>
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Ville</label>
            <input
              type="text"
              value={ville}
              onChange={e => setVille(e.target.value)}
              placeholder="Filtrer par ville…"
              className={styles.filterSelect}
              aria-label="Filtrer par ville"
            />
          </div>
        </div>

        {loading ? (
          <p className={styles.emptyText}>Chargement des entreprises…</p>
        ) : erreur ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>{erreur}</p>
          </div>
        ) : entreprises.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏢</div>
            <p className={styles.emptyTitle}>Aucune entreprise trouvée</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {entreprises.map(e => (
              <article key={e.id} className={styles.proCard}>
                <div className={styles.proCardTop}>
                  <div className={styles.avatar}>{e.prenom?.[0] || '🏢'}</div>
                </div>
                <div>
                  <h2 className={styles.proName}>{e.prenom} {e.nom}</h2>
                  <p className={styles.proVille}>📍 {e.ville || 'Ville non renseignée'}</p>
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