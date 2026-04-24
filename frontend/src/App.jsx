import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { Navigate, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Problems from './pages/Problems'
import { Toaster } from 'react-hot-toast'

function App() {

  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (<>

    <Navbar />
    <Routes>
      <Route path="/" element={!isSignedIn ? <Home /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/problems" element={isSignedIn ? <Problems /> : <Navigate to="/" />} />
    </Routes>
    <Toaster position='top-right' toastOptions={{duration: 3000}}/>
  </>
  )
}

export default App
