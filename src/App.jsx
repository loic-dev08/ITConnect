import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import ProProfile from './pages/ProProfile';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from'./components/ProtectedRoute';

function App() {
  return(
    <BrowserRouter>
    <Routes>

      */ Pages publiques*/
      <Route path='/'element={<Home/>}/>
      <Route path='/recherche'element={<Search />} />
      <Route path='/pro/:id'element={<ProProfile />} />
      <Route path='/inscription'element={<Register />} />
      <Route path='/connexion'element={<Login />} />
      <Route element={<ProtectedRoute />} />
      <Route path='/dashboard'element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App