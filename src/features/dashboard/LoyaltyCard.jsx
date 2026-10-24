import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card.jsx'
import { getTotalVisits } from '../../services/visitStatsService.js'

// Shows how many times the customer has had a haircut — no rewards, just the count.
export default function LoyaltyCard() {
  const visits = getTotalVisits()

  return (
    <Card title="Dina besök" action={<Link to="/profil" className="text-xs text-brand">Statistik →</Link>}>
      <p className="text-5xl font-bold text-brand tabular-nums">{visits}</p>
      <p className="mt-2 text-zinc-300">
        {visits === 1 ? 'klippning' : 'klippningar'} hos oss
      </p>
    </Card>
  )
}
