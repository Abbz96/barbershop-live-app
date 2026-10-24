import BarberAdminPanel from '../shopStatus/BarberAdminPanel.jsx'

// The barber's view. No login yet — add route protection before this goes live.
export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Frisörvy</h1>
      <BarberAdminPanel />
    </div>
  )
}
