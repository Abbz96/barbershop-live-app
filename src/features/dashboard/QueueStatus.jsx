import Card from '../../components/ui/Card.jsx'

export default function QueueStatus({ entry, position }) {
  if (!entry) {
    return (
      <Card title="Livekö">
        <p className="text-zinc-400">Du står inte i kö just nu.</p>
      </Card>
    )
  }

  return (
    <Card title="Livekö" action={<span className="text-xs text-emerald-400">● Live</span>}>
      <p className="text-5xl font-bold text-brand">#{position}</p>
      <p className="mt-2 text-zinc-300">
        Ungefär <strong>{entry.etaMinutes} min</strong> kvar
      </p>
      <p className="text-sm text-zinc-500">
        {entry.service} hos {entry.barber}
      </p>
    </Card>
  )
}
