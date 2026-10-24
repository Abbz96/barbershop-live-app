import { Link } from 'react-router-dom'
import LiveShopStatus from '../shopStatus/LiveShopStatus.jsx'
import LoyaltyCard from './LoyaltyCard.jsx'

// The customer's view: is it worth coming in now, my visits, pay.
export default function UserDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Hej! 👋</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <LiveShopStatus />
        <LoyaltyCard />
      </div>
      <Link
        to="/betala"
        className="block w-full rounded-2xl bg-brand py-4 text-center font-semibold text-zinc-950 transition-colors hover:bg-brand-dark"
      >
        Betala ditt besök
      </Link>
    </div>
  )
}
