import { barbers, queue } from '../../data/mockData.js'
import Card from '../../components/ui/Card.jsx'
import QueueManager from './QueueManager.jsx'

// The barber's view: who is waiting, who is free, call the next customer.
// No login yet — add route protection before this goes live.
export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Frisörvy</h1>

      <div className="grid grid-cols-2 gap-4">
        <Card title="I kö">
          <p className="text-3xl font-bold">{queue.length}</p>
        </Card>
        <Card title="Lediga frisörer">
          <p className="text-3xl font-bold">
            {barbers.filter((b) => b.status === 'available').length}
            <span className="text-base text-zinc-500"> / {barbers.length}</span>
          </p>
        </Card>
      </div>

      <QueueManager />
    </div>
  )
}
