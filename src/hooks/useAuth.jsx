import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

// ── useAuth ───────────────────────────────────────────────────
// Hook personnalisé pour gérer l'authentification.
// Expose : user, token, isAuthenticated, login(), logout(), updateUser()
//
// Utilisation dans un composant :
//   const { user, isAuthenticated, login, logout } = useAuth()
// ─────────────────────────────────────────────────────────────

export function useAuth() {
  const navigate = useNavigate()

  // Initialise depuis le localStorage (persistance entre les rechargements)
  const [user, setUser]   = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null')
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  // ── Connexion ──
  // À appeler depuis Connexion.jsx en remplacement de la simulation
  // Exemple :
  //   const { login } = useAuth()
  //   await login({ email, motDePasse })
  const login = useCallback(async ({ email, motDePasse }) => {
    try {
      const { token: newToken, user: newUser } = await authService.login({ email, motDePasse })
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))
      setToken(newToken)
      setUser(newUser)
      navigate('/dashboard')
    } catch (err) {
      // Remonte l'erreur au composant appelant pour afficher le message
      throw err
    }
  }, [navigate])

  // ── Inscription ──
  // À appeler depuis Inscription.jsx en remplacement de la simulation
  const register = useCallback(async (formData) => {
    try {
      const { token: newToken, user: newUser } = await authService.register(formData)
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))
      setToken(newToken)
      setUser(newUser)
      navigate('/dashboard')
    } catch (err) {
      throw err
    }
  }, [navigate])

  // ── Déconnexion ──
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    navigate('/')
  }, [navigate])

  // ── Mise à jour du profil ──
  // À appeler depuis ProfilUtilisateur.jsx après un PUT /api/auth/me
  const updateUser = useCallback((updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }, [user])

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    updateUser,
  }
}
