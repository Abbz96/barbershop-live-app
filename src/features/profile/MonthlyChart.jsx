import Card from '../../components/ui/Card.jsx'
import { getMonthlyCounts } from '../../services/visitStatsService.js'

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
const MONTHS_LONG = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']
const PLOT_HEIGHT_PX = 128

// One thin bar per month. Each column is a button so the tooltip opens on
// hover, keyboard focus and tap alike; the history list below is the table view.
export default function MonthlyChart({ today }) {
  const year = today.getFullYear()
  const counts = getMonthlyCounts(year)
  const currentMonth = today.getMonth()
  const max = Math.max(2, ...counts)
  const gridLines = Array.from({ length: max + 1 }, (_, i) => i)

  return (
    <Card title={`Klippningar per månad ${year}`}>
      <div className="flex gap-2">
        {/* Y axis: whole numbers only — you can't have half a haircut. */}
        <div className="relative w-3 shrink-0 text-right text-[10px] text-zinc-500" style={{ height: PLOT_HEIGHT_PX }}>
          {gridLines.map((n) => (
            <span key={n} className="absolute right-0 -translate-y-1/2" style={{ bottom: `${(n / max) * 100}%` }}>
              {n}
            </span>
          ))}
        </div>

        <div className="flex-1">
          <div className="relative" style={{ height: PLOT_HEIGHT_PX }}>
            {gridLines.map((n) => (
              <div
                key={n}
                className={`absolute inset-x-0 border-t ${n === 0 ? 'border-zinc-600' : 'border-zinc-800'}`}
                style={{ bottom: `${(n / max) * 100}%` }}
              />
            ))}

            <div className="absolute inset-0 grid grid-cols-12">
              {counts.map((count, month) => {
                const isFuture = month > currentMonth
                // Pin edge tooltips to the inside so they never spill off a phone screen.
                const tooltipAlign = month < 2 ? 'left-0' : month > 9 ? 'right-0' : ''
                const label = isFuture
                  ? `${MONTHS_LONG[month]}: ännu inte här`
                  : `${MONTHS_LONG[month]}: ${count} ${count === 1 ? 'klippning' : 'klippningar'}`

                return (
                  <button
                    key={month}
                    type="button"
                    aria-label={label}
                    className="group relative flex h-full items-end justify-center rounded-md outline-none hover:bg-zinc-800/50 focus-visible:bg-zinc-800/50"
                  >
                    {count > 0 && (
                      <span
                        className="w-2.5 rounded-t-[4px] bg-brand transition-opacity group-hover:opacity-80 sm:w-4"
                        style={{ height: `${(count / max) * 100}%` }}
                      />
                    )}
                    <span
                      role="tooltip"
                      className={`pointer-events-none absolute bottom-full z-10 ${tooltipAlign} mb-1 hidden whitespace-nowrap rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-100 shadow-lg group-hover:block group-focus:block`}
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-1.5 grid grid-cols-12 text-center text-[10px]">
            {MONTHS.map((name, month) => (
              <span key={name} className={month > currentMonth ? 'text-zinc-700' : 'text-zinc-500'}>
                {name.charAt(0).toUpperCase()}
                <span className="hidden sm:inline">{name.slice(1)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
