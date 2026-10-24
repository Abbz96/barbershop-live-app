import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import UserDashboard from './features/dashboard/UserDashboard.jsx'
import AdminDashboard from './features/admin/AdminDashboard.jsx'
import NotFound from './pages/NotFound.jsx'

// All pages share <Layout>, which renders the header, bottom nav and an <Outlet>
// where the matching child route appears.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
