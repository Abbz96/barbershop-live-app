import Card from '../../components/ui/Card.jsx'
import { loyalty } from '../../data/mockData.js'

// A stamp card: one dot per visit, filled as the customer earns them.
export default function LoyaltyCard() {
  const { visits, visitsForReward, rewardLabel } = loyalty
  const remaining = visitsForReward - visits

  return (
    <Card title="Stämpelkort">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: visitsForReward }, (_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-full border-2 ${
              i < visits ? 'border-brand bg-brand' : 'border-zinc-700'
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-zinc-400">
        {remaining > 0 ? `${remaining} besök kvar till ${rewardLabel.toLowerCase()}` : `${rewardLabel} väntar!`}
      </p>
    </Card>
  )
}
