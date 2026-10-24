import LiveShopStatus from '../shopStatus/LiveShopStatus.jsx'
import LoyaltyCard from './LoyaltyCard.jsx'
import SwishPayButton from './SwishPayButton.jsx'

// The customer's view: is it worth coming in now, how close is my reward, pay.
export default function UserDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Hej! 👋</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <LiveShopStatus />
        <LoyaltyCard />
      </div>
      <SwishPayButton amountSek={500} />
    </div>
  )
}
