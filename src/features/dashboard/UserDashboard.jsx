import { queue } from '../../data/mockData.js'
import QueueStatus from './QueueStatus.jsx'
import LoyaltyCard from './LoyaltyCard.jsx'
import SwishPayButton from './SwishPayButton.jsx'

// The customer's view: where am I in the queue, how close is my reward, pay.
export default function UserDashboard() {
  const me = queue.find((entry) => entry.isCurrentUser)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Hej! 👋</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <QueueStatus entry={me} position={queue.indexOf(me) + 1} />
        <LoyaltyCard />
      </div>
      <SwishPayButton amountSek={500} />
    </div>
  )
}
