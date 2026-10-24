import { Link } from 'react-router-dom'
import { formatSek, methodLabel } from './paymentMethods.js'

const formatDateTime = (date) =>
  date.toLocaleString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

// The digital receipt, styled like a paper slip.
export default function ReceiptStep({ receipt, onDone }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-400/15 text-3xl text-emerald-400">
          ✓
        </span>
        <p className="mt-3 text-xl font-bold">Tack för ditt besök!</p>
        <p className="text-sm text-zinc-400">Betalningen är klar.</p>
      </div>

      <section className="rounded-2xl bg-zinc-100 p-5 text-zinc-900" aria-label="Kvitto">
        <div className="border-b border-dashed border-zinc-300 pb-3 text-center">
          <p className="font-bold tracking-wide">BARBERSHOP LIVE</p>
          <p className="text-xs text-zinc-500">Kvitto {receipt.receiptNumber}</p>
          <p className="text-xs text-zinc-500">{formatDateTime(receipt.paidAt)}</p>
        </div>

        <dl className="space-y-1.5 py-3 text-sm">
          <div className="flex justify-between">
            <dt>{receipt.serviceName}</dt>
            <dd className="tabular-nums">{formatSek(receipt.priceSek)}</dd>
          </div>
          <div className="flex justify-between text-zinc-500">
            <dt>Varav moms 25 %</dt>
            <dd className="tabular-nums">{formatSek(receipt.vatSek)}</dd>
          </div>
        </dl>

        <dl className="space-y-1.5 border-t border-dashed border-zinc-300 pt-3 text-sm">
          <div className="flex justify-between text-base font-bold">
            <dt>Totalt</dt>
            <dd className="tabular-nums">{formatSek(receipt.priceSek)}</dd>
          </div>
          <div className="flex justify-between text-zinc-500">
            <dt>Betalsätt</dt>
            <dd>{methodLabel(receipt.method)}</dd>
          </div>
        </dl>
      </section>

      <Link
        to="/dashboard"
        className="block w-full rounded-2xl bg-brand py-4 text-center font-semibold text-zinc-950 transition-colors hover:bg-brand-dark"
      >
        Till startsidan
      </Link>
      <button type="button" onClick={onDone} className="w-full py-2 text-sm text-zinc-400 hover:text-zinc-100">
        Gör en ny betalning
      </button>
    </div>
  )
}
