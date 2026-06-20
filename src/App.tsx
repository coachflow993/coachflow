import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './lib/auth-context'
import BottomNav from './components/BottomNav'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import Today from './pages/Today'
import Squad from './pages/Squad'
import Sessions from './pages/Sessions'
import Matches from './pages/Matches'
import More from './pages/More'

function AuthenticatedLayout() {
  return (
    <div className="flex min-h-svh flex-col pb-14">
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/squad" element={<Squad />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/more" element={<More />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="eyebrow animate-pulse">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    )
  }

  return <AuthenticatedLayout />
}
