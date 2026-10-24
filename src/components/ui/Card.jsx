// The basic surface every dashboard panel sits on.
export default function Card({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-4 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between">
          {title && <h2 className="text-sm font-semibold text-zinc-300">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
