import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home        from './pages/Home'
import Search      from './pages/Search'
import ProProfil   from './pages/ProProfil'
import Register    from './pages/Inscription'
import Login       from './pages/Connexion'
import Dashboard   from './pages/Dashboard'
import ProDemandes from './pages/ProDemandes'
import ProtectedRoute from './components/ProtectedRoute'

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
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App