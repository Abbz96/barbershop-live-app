import Card from '../../components/ui/Card.jsx'
import { useShopStatus } from '../../hooks/useShopStatus.js'
import {
  SHOP_STATUSES,
  callNextCustomer,
  changeInChairs,
  changeWaiting,
  setShopStatus,
  setSimulation,
} from '../../services/shopStatusService.js'
import { statusLabels } from './statusLabels.js'

// Barber controls. Every button calls the service, so the customer view
// (in this or another tab) updates at the same moment.
export default function BarberAdminPanel() {
  const shop = useShopStatus()
  const canCallNext = shop.waiting > 0 && shop.inChairs < shop.chairsTotal

  return (
    <div className="space-y-4">
      <Card title="Salongens status">
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Salongens status">
          {SHOP_STATUSES.map((status) => {
            const active = shop.status === status
            return (
              <button
                key={status}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setShopStatus(status)}
                className={`rounded-xl border py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-zinc-800 text-zinc-400 hover:text-zinc-100'
                }`}
              >
                <span className={`mx-auto mb-1 block size-2.5 rounded-full ${statusLabels[status].dot}`} />
                {statusLabels[status].label}
              </button>
            )
          })}
        </div>
      </Card>

      <Card title="Kö och stolar">
        <div className="divide-y divide-zinc-800">
          <Stepper
            label="Väntar i kö"
            value={shop.waiting}
            onDecrease={() => changeWaiting(-1)}
            onIncrease={() => changeWaiting(1)}
            canDecrease={shop.waiting > 0}
          />
          <Stepper
            label="Kunder i stolen"
            value={`${shop.inChairs}/${shop.chairsTotal}`}
            onDecrease={() => changeInChairs(-1)}
            onIncrease={() => changeInChairs(1)}
            canDecrease={shop.inChairs > 0}
            canIncrease={shop.inChairs < shop.chairsTotal}
          />
        </div>

        <button
          type="button"
          onClick={callNextCustomer}
          disabled={!canCallNext}
          className="mt-4 w-full rounded-xl bg-brand py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-brand-dark disabled:opacity-40"
        >
          Nästa kund till stolen
        </button>
        {!canCallNext && (
          <p className="mt-2 text-center text-xs text-zinc-500">
            {shop.waiting === 0 ? 'Ingen väntar i kö.' : 'Alla stolar är upptagna.'}
          </p>
        )}
      </Card>

      <label className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
        <span>
          <span className="block text-sm font-medium">Simulera kundtrafik</span>
          <span className="block text-xs text-zinc-500">Demoläge: kunder kommer och går av sig själva.</span>
        </span>
        <input
          type="checkbox"
          checked={shop.simulate}
          onChange={(e) => setSimulation(e.target.checked)}
          className="size-5 accent-[var(--color-brand)]"
        />
      </label>
    </div>
  )
}

function Stepper({ label, value, onDecrease, onIncrease, canDecrease = true, canIncrease = true }) {
  const buttonClass =
    'size-11 rounded-xl bg-zinc-800 text-xl font-semibold transition-colors hover:bg-zinc-700 disabled:opacity-30'

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-zinc-300">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={onDecrease} disabled={!canDecrease} className={buttonClass} aria-label={`Minska ${label.toLowerCase()}`}>
          −
        </button>
        <span className="w-12 text-center text-xl font-bold tabular-nums">{value}</span>
        <button type="button" onClick={onIncrease} disabled={!canIncrease} className={buttonClass} aria-label={`Öka ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  )
}
