import { useState } from 'react'
import Card from '../../components/ui/Card.jsx'
import { getVisitsInYear } from '../../services/visitStatsService.js'
import MonthlyChart from './MonthlyChart.jsx'
import NextVisitHint from './NextVisitHint.jsx'
import VisitHistory from './VisitHistory.jsx'

// "Mina sidor": the customer's own haircut statistics.
export default function ProfilePage() {
  // Read the clock once per visit to the page, not on every re-render.
  const [today] = useState(() => new Date())
  const year = today.getFullYear()
  const cutsThisYear = getVisitsInYear(year).length

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mina sidor</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card title={`Klippningar ${year}`}>
          <p className="text-5xl font-bold text-brand tabular-nums">{cutsThisYear}</p>
          <p className="mt-2 text-zinc-300">{cutsThisYear === 1 ? 'klippning' : 'klippningar'} hittills i år</p>
        </Card>
        <NextVisitHint today={today} />
      </div>

      <MonthlyChart today={today} />
      <VisitHistory />
    </div>
  )
}
