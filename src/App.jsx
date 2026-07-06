import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import ProProfile from './pages/ProProfil';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from'./components/ProtectedRoute';
import ProDemandes from './pages/ProDemandes';
import ProProfil from './pages/ProProfil';


function App() {
  return(
    <BrowserRouter>
    <Routes>

      */ Pages publiques*/
      <Route path='/'element={<Home/>}/>
      <Route path='/recherche'element={<Search />} />
      <Route path='/pro/:id'element={<ProProfil />} />
      <Route path='/inscription'element={<Register />} />
      <Route path='/connexion'element={<Login />} />
      <Route element={<ProtectedRoute />} />
      <Route path='/dashboard'element={<Dashboard />} />
      <Route path="/dashboard/demandes" element={<ProDemandes />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App