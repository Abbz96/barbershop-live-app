import Card from '../../components/ui/Card.jsx'
import { getVisitRhythm } from '../../services/visitStatsService.js'

const formatDay = (date) => date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })

// Swedish ordinal suffix: 1:a, 2:a, 3:e, 4:e … 21:a, 22:a.
function ordinal(n) {
  const lastTwo = n % 100
  const last = n % 10
  return `${n}:${(last === 1 || last === 2) && lastTwo !== 11 && lastTwo !== 12 ? 'a' : 'e'}`
}

// "When is it time again?" — based on the customer's own rhythm.
export default function NextVisitHint({ today }) {
  const rhythm = getVisitRhythm(today)
  if (!rhythm) return null

  const weeks = Math.max(1, Math.round(rhythm.typicalGapDays / 7))
  const habit = weeks === 1 ? 'varje vecka' : `var ${ordinal(weeks)} vecka`

  let headline
  if (rhythm.daysUntilDue < 0) headline = 'Dags för en ny klippning!'
  else if (rhythm.daysUntilDue <= 3) headline = 'Snart dags igen'
  else headline = `Nästa gång runt ${formatDay(rhythm.nextDue)}`

  return (
    <Card title="Dags snart igen?">
      <p className="text-xl font-bold text-brand">{headline}</p>
      <p className="mt-2 text-sm text-zinc-300">
        Du brukar klippa dig {habit}. Senast var för {rhythm.daysSinceLast} dagar sedan ({formatDay(rhythm.lastVisit)}).
      </p>
    </Card>
  )
}
