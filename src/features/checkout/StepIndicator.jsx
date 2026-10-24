// Three visible steps; "processing" counts as part of paying.
const STEPS = [
  { label: 'Tjänst', states: ['service'] },
  { label: 'Betalning', states: ['payment', 'processing'] },
  { label: 'Kvitto', states: ['receipt'] },
]

export default function StepIndicator({ step }) {
  const currentIndex = STEPS.findIndex((s) => s.states.includes(step))

  return (
    <ol className="flex items-center gap-2" aria-label="Steg i betalningen">
      {STEPS.map((s, i) => {
        const done = i < currentIndex
        const current = i === currentIndex
        return (
          <li key={s.label} className="flex flex-1 items-center gap-2" aria-current={current ? 'step' : undefined}>
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done || current ? 'bg-brand text-zinc-950' : 'bg-zinc-800 text-zinc-500'
              }`}
            >
              {done ? '✓' : i + 1}
            </span>
            <span className={`text-sm ${current ? 'text-zinc-100' : 'text-zinc-500'}`}>{s.label}</span>
            {i < STEPS.length - 1 && (
              <span className={`h-px flex-1 ${done ? 'bg-brand' : 'bg-zinc-800'}`} aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
