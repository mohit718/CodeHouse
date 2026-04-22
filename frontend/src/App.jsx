import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useUser } from '@clerk/react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'

function App() {
  const { user, isSignedIn } = useUser()
  return <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/dashboard' element={isSignedIn ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
    <Toaster position='top-right' toastOptions={{duration:3000}}/>
  </>
}

export default App
