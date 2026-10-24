import { useState } from 'react'
import Card from '../../components/ui/Card.jsx'
import { queue as initialQueue } from '../../data/mockData.js'

// Local state stands in for the live queue until there is a backend to sync with.
export default function QueueManager() {
  const [queue, setQueue] = useState(initialQueue)

  const callNext = () => setQueue((current) => current.slice(1))

  return (
    <Card
      title="Kön"
      action={
        <button
          type="button"
          onClick={callNext}
          disabled={queue.length === 0}
          className="rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-zinc-950 disabled:opacity-40"
        >
          Nästa kund
        </button>
      }
    >
      {queue.length === 0 ? (
        <p className="text-zinc-400">Kön är tom.</p>
      ) : (
        <ol className="divide-y divide-zinc-800">
          {queue.map((entry, i) => (
            <li key={entry.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">
                  {i + 1}. {entry.name}
                </p>
                <p className="text-sm text-zinc-500">
                  {entry.service} · {entry.barber}
                </p>
              </div>
              <span className="text-sm text-zinc-400">{i === 0 ? 'Nu' : `${entry.etaMinutes} min`}</span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
