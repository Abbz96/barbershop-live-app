import { services } from '../../data/mockData.js'
import { formatSek } from './paymentMethods.js'

const ICONS = { cut: '✂️', beard: '🧔', combo: '💈' }

export default function ServiceStep({ selectedId, onSelect, onNext }) {
  return (
    <div className="space-y-4">
      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm text-zinc-400">Vad har du gjort idag?</legend>
        {services.map((service) => {
          const selected = service.id === selectedId
          return (
            <label
              key={service.id}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${
                selected ? 'border-brand bg-brand/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
              }`}
            >
              <input
                type="radio"
                name="service"
                value={service.id}
                checked={selected}
                onChange={() => onSelect(service.id)}
                className="sr-only"
              />
              <span className="text-2xl" aria-hidden="true">{ICONS[service.id]}</span>
              <span className="flex-1">
                <span className="block font-semibold">{service.name}</span>
                <span className="block text-sm text-zinc-500">ca {service.minutes} min</span>
              </span>
              <span className="font-semibold tabular-nums">{formatSek(service.priceSek)}</span>
            </label>
          )
        })}
      </fieldset>

      <button
        type="button"
        onClick={onNext}
        disabled={!selectedId}
        className="w-full rounded-2xl bg-brand py-4 font-semibold text-zinc-950 transition-colors hover:bg-brand-dark disabled:opacity-40"
      >
        Fortsätt
      </button>
    </div>
  )
}
