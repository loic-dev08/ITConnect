import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../css/ProProfil.module.css'

// ── Données fictives ──────────────────────────────────────────
// À remplacer par : const { data } = await axios.get(`/api/professionnels/${id}`)
const PROS = {
  1: {
    id: 1,
    initiales: 'LM',
    nom: 'Larry Max',
    specialite: 'Réseau & Cybersécurité',
    ville: 'Melun',
    departement: 'Seine-et-Marne (77)',
    note: 5.0,
    avis: 24,
    dispo: true,
    experience: '8 ans',
    tarif: '65 €/h',
    missions: 47,
    bio: `Spécialiste en infrastructure réseau et cybersécurité depuis plus de 8 ans, j'interviens auprès de particuliers, PME et collectivités pour sécuriser, optimiser et maintenir vos systèmes informatiques.

Certifié Cisco CCNA et CompTIA Security+, j'ai accompagné plus de 40 clients dans la région Île-de-France Sud sur des projets allant de la simple configuration de réseau domestique à l'audit de sécurité complet d'infrastructures d'entreprise.

Disponible en déplacement dans un rayon de 60 km autour de Melun. Intervention rapide sous 24h pour les urgences.`,
    competences: [
      { label: 'Cisco / VLAN', icon: '🔧' },
      { label: 'Pare-feu & VPN', icon: '🛡️' },
      { label: 'Audit sécurité', icon: '🔍' },
      { label: 'Linux / Windows Server', icon: '🖥️' },
      { label: 'Wi-Fi entreprise', icon: '📶' },
      { label: 'CCNA', icon: '📜' },
      { label: 'CompTIA Security+', icon: '📜' },
      { label: 'Supervision réseau', icon: '📊' },
    ],
    avisClients: [
      { id: 1, initiales: 'CG', nom: 'Claire Girard', role: 'Particulière', ville: 'Sens', note: 5, date: 'Juin 2026', texte: 'Larry a configuré mon réseau en moins d\'une heure. Service impeccable, je recommande vivement !' },
      { id: 2, initiales: 'PG', nom: 'Pierre Garnier', role: 'DataSolutions SAS', ville: 'Melun', note: 5, date: 'Mai 2026', texte: 'Intervention rapide et efficace pour sécuriser notre infrastructure. Rapport détaillé et clair. Partenaire de confiance.' },
      { id: 3, initiales: 'AL', nom: 'Antoine Leroy', role: 'Particulier', ville: 'Fontainebleau', note: 5, date: 'Avril 2026', texte: 'Très professionnel, explique bien ce qu\'il fait. Mon réseau est enfin stable après des mois de problèmes.' },
    ],
  },
  2: {
    id: 2,
    initiales: 'LP',
    nom: 'Lucie Perrin',
    specialite: 'Administration Systèmes',
    ville: 'Montereau',
    departement: 'Seine-et-Marne (77)',
    note: 4.8,
    avis: 31,
    dispo: true,
    experience: '6 ans',
    tarif: '55 €/h',
    missions: 38,
    bio: `Administratrice systèmes expérimentée, je gère et maintiens des parcs informatiques pour des PME de la région. Spécialisée dans les environnements Windows Server et Linux, je propose des services de maintenance préventive, de gestion des sauvegardes et de migration vers le cloud.

Mon approche : réactivité, transparence et accompagnement sur le long terme. Je m'attache à comprendre les besoins spécifiques de chaque client pour proposer des solutions adaptées à leur budget et à leurs contraintes.`,
    competences: [
      { label: 'Windows Server', icon: '🖥️' },
      { label: 'Linux Ubuntu', icon: '🐧' },
      { label: 'Active Directory', icon: '👥' },
      { label: 'Azure / Office 365', icon: '☁️' },
      { label: 'Sauvegarde & PRA', icon: '💾' },
      { label: 'Virtualisation VMware', icon: '⚙️' },
    ],
    avisClients: [
      { id: 1, initiales: 'MB', nom: 'Marc Bouvier', role: 'TechLog Industries', ville: 'Auxerre', note: 5, date: 'Juin 2026', texte: 'Lucie gère notre parc de 40 postes avec une efficacité remarquable. Partenaire de confiance depuis 2 ans.' },
      { id: 2, initiales: 'SL', nom: 'Sophie Laurent', role: 'Particulière', ville: 'Montereau', note: 4, date: 'Mai 2026', texte: 'Très bonne prestation pour la migration vers Office 365. Quelques délais mais résultat impeccable.' },
    ],
  },
  3: {
    id: 3,
    initiales: 'AC',
    nom: 'Amélie Chevalier',
    specialite: 'Développement React/Node',
    ville: 'Sens',
    departement: 'Yonne (89)',
    note: 4.0,
    avis: 17,
    dispo: false,
    experience: '4 ans',
    tarif: '60 €/h',
    missions: 22,
    bio: `Développeuse full-stack spécialisée en React et Node.js, je conçois des applications web modernes, performantes et accessibles. De la maquette à la mise en production, j'accompagne mes clients dans toutes les étapes de leur projet digital.

Passionnée par l'UX et le clean code, je travaille en méthode agile et livre des projets bien documentés, testés et maintenables.`,
    competences: [
      { label: 'React / Vite', icon: '⚛️' },
      { label: 'Node.js / Express', icon: '🟢' },
      { label: 'MySQL / MongoDB', icon: '🗄️' },
      { label: 'TypeScript', icon: '📘' },
      { label: 'Git / GitHub', icon: '🐙' },
      { label: 'Figma', icon: '🎨' },
    ],
    avisClients: [
      { id: 1, initiales: 'MB', nom: 'Manon Bouchard', role: 'Particulière', ville: 'Lunel', note: 4, date: 'Mai 2026', texte: 'Amélie a créé mon site vitrine en 3 semaines. Design moderne et livraison dans les délais.' },
    ],
  },
}

// Profil générique pour les IDs non définis (4 à 12)
function getProGenerique(id) {
  const noms = ['Nina Vallet', 'Éric Castel', 'Romain Bernard', 'Thomas Mercier', 'Sophie Blanchard', 'Pierre Lefebvre', 'Marie Leclerc', 'Julien Dupont', 'Charlotte Renard']
  const specs = ['UX Design & Intégration', 'Data Science & IA', 'Développement Mobile', 'Réseau & Cybersécurité', 'Administration Systèmes', 'Développement Web', 'Support & Dépannage', 'Cloud & DevOps', 'UX Design & Intégration']
  const villes = ['Melun', 'Auxerre', 'Montpellier', 'Sens', 'Auxerre', 'Montereau', 'Melun', 'Paris', 'Sens']
  const initiales = ['NV','EC','RB','TM','SB','PL','ML','JD','CR']
  const idx = (id - 4) % noms.length
  return {
    id, initiales: initiales[idx], nom: noms[idx], specialite: specs[idx],
    ville: villes[idx], departement: 'Île-de-France', note: 4.3, avis: 12,
    dispo: id % 2 === 0, experience: '5 ans', tarif: '55 €/h', missions: 20,
    bio: `Professionnel IT expérimenté, je propose mes services dans la région. Contactez-moi pour discuter de votre projet.`,
    competences: [{ label: specs[idx], icon: '💻' }, { label: 'Support client', icon: '🤝' }],
    avisClients: [],
  }
}

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

// ── Validation formulaire ─────────────────────────────────────
function validerContact({ objet, message }) {
  const erreurs = {}
  if (!objet.trim())   erreurs.objet   = 'Veuillez indiquer l\'objet de votre demande.'
  if (!message.trim()) erreurs.message = 'Veuillez décrire votre besoin.'
  else if (message.trim().length < 20) erreurs.message = 'Votre message doit contenir au moins 20 caractères.'
  return erreurs
}

// ── Page ProProfil ────────────────────────────────────────────
export default function ProProfil() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Récupère le profil selon l'id de l'URL
  // À remplacer par : const { data: pro } = await axios.get(`/api/professionnels/${id}`)
  const pro = PROS[Number(id)] || (Number(id) >= 4 && Number(id) <= 12 ? getProGenerique(Number(id)) : null)

  // Formulaire de contact
  const [form, setForm]       = useState({ objet: '', message: '' })
  const [erreurs, setErreurs] = useState({})
  const [loading, setLoading] = useState(false)
  const [succes, setSucces]   = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (erreurs[name]) setErreurs(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const erreursValidation = validerContact(form)
    if (Object.keys(erreursValidation).length > 0) {
      setErreurs(erreursValidation)
      return
    }
    setLoading(true)
    try {
      // À remplacer par :
      // await axios.post('/api/demandes', {
      //   professionnelId: pro.id,
      //   objet: form.objet,
      //   message: form.message,
      // })
      await new Promise(r => setTimeout(r, 1500))
      setSucces(true)
      setForm({ objet: '', message: '' })
    } catch {
      setErreurs({ global: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setLoading(false)
    }
  }

  // Profil introuvable
  if (!pro) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>🔍</div>
            <p className={styles.notFoundTitle}>Professionnel introuvable</p>
            <p className={styles.notFoundText}>Ce profil n'existe pas ou a été supprimé.</p>
            <button className={styles.notFoundBtn} onClick={() => navigate('/recherche')}>
              Retour à la recherche
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.container}>

        {/* ── Retour ── */}
        <Link to="/recherche" className={styles.backLink}>
          ← Retour aux résultats
        </Link>

        <div className={styles.layout}>

          {/* ══ COLONNE GAUCHE ══ */}
          <aside className={styles.sidebar}>

            {/* Carte profil */}
            <div className={styles.profileCard}>
              <div className={styles.avatar}>{pro.initiales}</div>
              <h1 className={styles.proName}>{pro.nom}</h1>
              <p className={styles.proSpec}>{pro.specialite}</p>
              <span className={`${styles.dispoBadge} ${pro.dispo ? styles.dispoOn : styles.dispoOff}`}>
                {pro.dispo ? '● Disponible' : '○ Actuellement occupé'}
              </span>

              <div className={styles.noteRow}>
                <Stars note={pro.note} />
                <span className={styles.noteValue}>{pro.note}/5</span>
              </div>
              <span className={styles.avisCount}>{pro.avis} avis clients</span>

              <ul className={styles.metaList}>
                <li className={styles.metaItem}>
                  <span className={styles.metaIcon}>📍</span>
                  {pro.ville} · {pro.departement}
                </li>
                <li className={styles.metaItem}>
                  <span className={styles.metaIcon}>💼</span>
                  {pro.experience} d'expérience
                </li>
                <li className={styles.metaItem}>
                  <span className={styles.metaIcon}>💶</span>
                  À partir de {pro.tarif}
                </li>
                <li className={styles.metaItem}>
                  <span className={styles.metaIcon}>✅</span>
                  {pro.missions} missions réalisées
                </li>
              </ul>
            </div>

            {/* Carte contact rapide */}
            <div className={styles.contactCard}>
              <p className={styles.contactCardTitle}>Prêt à collaborer ?</p>
              <p className={styles.contactCardSub}>Envoyez votre demande directement à {pro.nom.split(' ')[0]}</p>
              <button
                className={styles.contactCardBtn}
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ✉️ Envoyer une demande
              </button>
            </div>
          </aside>

          {/* ══ COLONNE DROITE ══ */}
          <main className={styles.main}>

            {/* Statistiques */}
            <div className={styles.card}>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>{pro.missions}</span>
                  <span className={styles.statLabel}>Missions réalisées</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>{pro.note}/5</span>
                  <span className={styles.statLabel}>Note moyenne</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>{pro.avis}</span>
                  <span className={styles.statLabel}>Avis clients</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <section className={styles.card} aria-labelledby="bio-title">
              <h2 id="bio-title" className={styles.cardTitle}>À propos</h2>
              {pro.bio.split('\n\n').map((para, i) => (
                <p key={i} className={styles.bio} style={{ marginBottom: i < pro.bio.split('\n\n').length - 1 ? 12 : 0 }}>
                  {para}
                </p>
              ))}
            </section>

            {/* Compétences */}
            <section className={styles.card} aria-labelledby="skills-title">
              <h2 id="skills-title" className={styles.cardTitle}>Compétences & outils</h2>
              <div className={styles.skillsGrid}>
                {pro.competences.map((c, i) => (
                  <span key={i} className={styles.skill}>
                    <span className={styles.skillIcon}>{c.icon}</span>
                    {c.label}
                  </span>
                ))}
              </div>
            </section>

            {/* Avis clients */}
            <section className={styles.card} aria-labelledby="avis-title">
              <h2 id="avis-title" className={styles.cardTitle}>
                Avis clients ({pro.avisClients.length})
              </h2>
              {pro.avisClients.length > 0 ? (
                <div className={styles.avisList}>
                  {pro.avisClients.map(a => (
                    <div key={a.id} className={styles.avisCard}>
                      <div className={styles.avisHeader}>
                        <div className={styles.avisAuteur}>
                          <div className={styles.avisAvatar}>{a.initiales}</div>
                          <div>
                            <p className={styles.avisNom}>{a.nom}</p>
                            <span className={styles.avisRole}>{a.role} · {a.ville}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Stars note={a.note} />
                          <span className={styles.avisDate}>{a.date}</span>
                        </div>
                      </div>
                      <p className={styles.avisTexte}>"{a.texte}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#9A8FBD', fontSize: 13 }}>Aucun avis pour le moment.</p>
              )}
            </section>

            {/* Formulaire de contact */}
            <section className={styles.card} id="contact-form" aria-labelledby="contact-title">
              <h2 id="contact-title" className={styles.cardTitle}>
                Envoyer une demande à {pro.nom.split(' ')[0]}
              </h2>

              {succes ? (
                <div className={styles.successBanner}>
                  ✅ Votre demande a bien été envoyée ! {pro.nom.split(' ')[0]} vous répondra dans les meilleurs délais.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>

                  {/* Objet */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="objet" className={styles.label}>Objet de la demande</label>
                    <select
                      id="objet"
                      name="objet"
                      value={form.objet}
                      onChange={handleChange}
                      className={`${styles.select} ${erreurs.objet ? styles.inputError : ''}`}
                      aria-describedby={erreurs.objet ? 'objet-error' : undefined}
                    >
                      <option value="">-- Choisissez un objet --</option>
                      <option value="Dépannage urgent">🔧 Dépannage urgent</option>
                      <option value="Projet ponctuel">📋 Projet ponctuel</option>
                      <option value="Contrat de maintenance">🔄 Contrat de maintenance</option>
                      <option value="Audit / Conseil">🔍 Audit / Conseil</option>
                      <option value="Formation">🎓 Formation</option>
                      <option value="Autre">💬 Autre</option>
                    </select>
                    {erreurs.objet && (
                      <p id="objet-error" className={styles.errorMsg} role="alert">⚠ {erreurs.objet}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="message" className={styles.label}>Décrivez votre besoin</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={`Bonjour ${pro.nom.split(' ')[0]}, j'aurais besoin de votre aide pour…`}
                      className={`${styles.textarea} ${erreurs.message ? styles.inputError : ''}`}
                      aria-describedby={erreurs.message ? 'message-error' : undefined}
                    />
                    {erreurs.message && (
                      <p id="message-error" className={styles.errorMsg} role="alert">⚠ {erreurs.message}</p>
                    )}
                  </div>

                  {erreurs.global && (
                    <p className={styles.errorMsg} role="alert">⚠ {erreurs.global}</p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading && <span className={styles.spinner} aria-hidden="true" />}
                    {loading ? 'Envoi en cours…' : '✉️ Envoyer ma demande'}
                  </button>

                </form>
              )}
            </section>

          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
