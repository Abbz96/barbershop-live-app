import { useState } from 'react'
import Card from '../../components/ui/Card.jsx'
import { getVisits, parseDate } from '../../services/visitStatsService.js'

const INITIAL_ROWS = 5

const formatDate = (isoDate) =>
  parseDate(isoDate).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })

// Every visit, newest first. Short by default so the page stays scannable on a phone.
export default function VisitHistory() {
  const visits = getVisits()
  const [showAll, setShowAll] = useState(false)
  const shown = showAll ? visits : visits.slice(0, INITIAL_ROWS)

  return (
    <Card title="Besökshistorik" action={<span className="text-xs text-zinc-500">{visits.length} besök totalt</span>}>
      <ul className="divide-y divide-zinc-800">
        {shown.map((visit) => (
          <li key={visit.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="font-medium">{visit.serviceName}</p>
              <p className="text-sm text-zinc-500">
                {formatDate(visit.date)} · {visit.barber}
              </p>
            </div>
            <span className="shrink-0 text-sm text-zinc-300 tabular-nums">{visit.priceSek} kr</span>
          </li>
        ))}
      </ul>

      {visits.length > INITIAL_ROWS && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-2 w-full rounded-xl py-2.5 text-sm font-medium text-brand hover:bg-zinc-800/60"
        >
          {showAll ? 'Visa färre' : `Visa alla ${visits.length} besök`}
        </button>
      )}
    </Card>
  )
}
