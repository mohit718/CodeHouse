import { useUser } from '@clerk/react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Problem from './pages/Problem'
import Problems from './pages/Problems'

function App() {

  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (<div className="max-w-450 mx-auto">
    <Navbar />
    <Routes>
      <Route path="/" element={!isSignedIn ? <Home /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/problems" element={isSignedIn ? <Problems /> : <Navigate to="/" />} />
      <Route path="/problem/:id" element={isSignedIn ? <Problem /> : <Navigate to="/" />} />
    </Routes>
    <Toaster position='top-right' toastOptions={{duration: 3000}}/>
  </div>
  )
}

export default App
