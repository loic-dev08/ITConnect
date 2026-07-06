import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home        from './pages/Home'
import Search      from './pages/Search'
import ProProfil   from './pages/ProProfil'
import Register    from './pages/Inscription'
import Login       from './pages/Connexion'
import Dashboard   from './pages/Dashboard'
import ProDemandes from './pages/ProDemandes'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound    from './pages/NotFound'
import ProfilUtilisateur from './pages/ProfilUtilisateur'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Pages publiques ── */}
        <Route path="/"           element={<Home />} />
        <Route path="/recherche"  element={<Search />} />
        <Route path="/pro/:id"    element={<ProProfil />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion"  element={<Login />} />

        {/* ── Pages privées (nécessitent d'être connecté) ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard"           element={<Dashboard />} />
          <Route path="/dashboard/demandes"  element={<ProDemandes />} />

          // Dans la zone protégée :

          <Route path="/dashboard/profil"    element={<ProfilUtilisateur />} />

          //A la fin des routes, après toutes les autres :
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App