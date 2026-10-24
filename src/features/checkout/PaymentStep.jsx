import { useState } from 'react'
import Card from '../../components/ui/Card.jsx'
import { services } from '../../data/mockData.js'
import { vatIncluded } from '../../services/paymentService.js'
import { formatSek, paymentMethods } from './paymentMethods.js'
import {
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
  isValidSwishNumber,
} from './validation.js'

// Order summary + choice of payment method + the fields that method needs.
export default function PaymentStep({ serviceId, method, onMethodChange, onBack, onPay }) {
  const service = services.find((s) => s.id === serviceId)
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })

  const isReady =
    (method === 'swish' && isValidSwishNumber(phone)) ||
    (method === 'card' && isValidCardNumber(card.number) && isValidExpiry(card.expiry) && isValidCvc(card.cvc)) ||
    method === 'applepay'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isReady) onPay()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Card title="Sammanfattning">
        <dl className="space-y-2 text-sm">
          <Row label={service.name} value={formatSek(service.priceSek)} />
          <Row label="Varav moms (25 %)" value={formatSek(vatIncluded(service.priceSek))} muted />
          <div className="border-t border-zinc-800 pt-2">
            <Row label="Att betala" value={formatSek(service.priceSek)} strong />
          </div>
        </dl>
      </Card>

      <fieldset>
        <legend className="mb-3 text-sm text-zinc-400">Välj betalsätt</legend>
        <div className="grid grid-cols-3 gap-2">
          {paymentMethods.map((m) => {
            const selected = m.id === method
            return (
              <label
                key={m.id}
                className={`cursor-pointer rounded-2xl border p-3 text-center transition-colors ${
                  selected ? 'border-brand bg-brand/10' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={selected}
                  onChange={() => onMethodChange(m.id)}
                  className="sr-only"
                />
                <span className={`block font-semibold ${selected ? 'text-brand' : ''}`}>{m.label}</span>
                <span className="mt-0.5 block text-[11px] leading-tight text-zinc-500">{m.hint}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {method === 'swish' && (
        <Field
          label="Mobilnummer kopplat till Swish"
          value={phone}
          onChange={setPhone}
          placeholder="070 123 45 67"
          inputMode="tel"
          autoComplete="tel"
          error={phone && !isValidSwishNumber(phone) ? 'Skriv ett svenskt mobilnummer, t.ex. 070 123 45 67.' : null}
        />
      )}

      {method === 'card' && (
        <div className="space-y-3">
          <Field
            label="Kortnummer"
            value={card.number}
            onChange={(v) => setCard({ ...card, number: formatCardNumber(v) })}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            autoComplete="cc-number"
            error={card.number.replace(/\s/g, '').length >= 13 && !isValidCardNumber(card.number) ? 'Kortnumret verkar inte stämma.' : null}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Giltigt t.o.m."
              value={card.expiry}
              onChange={(v) => setCard({ ...card, expiry: formatExpiry(v) })}
              placeholder="MM/ÅÅ"
              inputMode="numeric"
              autoComplete="cc-exp"
              error={card.expiry.length === 5 && !isValidExpiry(card.expiry) ? 'Ogiltigt datum.' : null}
            />
            <Field
              label="CVC"
              value={card.cvc}
              onChange={(v) => setCard({ ...card, cvc: v.replace(/\D/g, '').slice(0, 4) })}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
        </div>
      )}

      {method === 'applepay' && (
        <p className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
          Du bekräftar betalningen med Face ID eller Touch ID i nästa steg.
        </p>
      )}

      <button
        type="submit"
        disabled={!isReady}
        className={`w-full rounded-2xl py-4 font-semibold transition-colors disabled:opacity-40 ${
          method === 'applepay'
            ? 'bg-white text-black hover:bg-zinc-200'
            : 'bg-brand text-zinc-950 hover:bg-brand-dark'
        }`}
      >
        {method === 'applepay' ? 'Betala med Apple Pay' : `Betala ${formatSek(service.priceSek)}`}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
        <span aria-hidden="true">🔒</span> Testläge – inga riktiga pengar dras.
      </p>

      <button type="button" onClick={onBack} className="w-full py-2 text-sm text-zinc-400 hover:text-zinc-100">
        ← Byt tjänst
      </button>
    </form>
  )
}

function Row({ label, value, muted, strong }) {
  return (
    <div className={`flex justify-between ${muted ? 'text-zinc-500' : ''} ${strong ? 'text-base font-bold' : ''}`}>
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  )
}

function Field({ label, value, onChange, error, ...inputProps }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-zinc-400">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-base tabular-nums outline-none transition-colors placeholder:text-zinc-600 focus:border-brand ${
          error ? 'border-red-400' : 'border-zinc-800'
        }`}
        {...inputProps}
      />
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  )
}
