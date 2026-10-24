import Card from '../../components/ui/Card.jsx'
import { useShopStatus } from '../../hooks/useShopStatus.js'
import { estimateWaitMinutes } from '../../services/shopStatusService.js'
import { statusLabels } from './statusLabels.js'

// Customer widget: is it open, how full is it, how long would I wait?
export default function LiveShopStatus() {
  const shop = useShopStatus()
  const { label, hint, dot, text } = statusLabels[shop.status]
  const isClosed = shop.status === 'closed'
  const wait = estimateWaitMinutes(shop)

  return (
    <Card
      title="Just nu i salongen"
      action={
        !isClosed && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        )
      }
    >
      {/* aria-live lets screen readers announce status changes as they happen. */}
      <div aria-live="polite">
        <div className="flex items-center gap-2">
          <span className={`size-3 rounded-full ${dot}`} />
          <p className={`text-2xl font-bold ${text}`}>{label}</p>
        </div>
        <p className="mt-1 text-sm text-zinc-400">{hint}</p>

        {!isClosed && (
          <>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat value={`${shop.inChairs}/${shop.chairsTotal}`} label="Kunder i stolen" />
              <Stat value={shop.waiting} label="Väntar i kö" />
            </div>
            <p className="mt-4 rounded-xl bg-zinc-800/60 px-3 py-2.5 text-sm text-zinc-300">
              {wait === 0 ? (
                <>
                  <strong className="text-brand">Ingen väntetid</strong> – kom direkt!
                </>
              ) : (
                <>
                  Beräknad väntetid: <strong className="text-brand">ca {wait} min</strong>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </Card>
  )
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl bg-zinc-800/60 p-3 text-center">
      <p className="text-3xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 text-xs text-zinc-400">{label}</p>
    </div>
  )
}
