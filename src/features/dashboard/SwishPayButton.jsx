// UI only for now. A real integration goes through the Swish Commerce API from a
// backend (it needs a merchant certificate), never directly from the browser.
export default function SwishPayButton({ amountSek }) {
  return (
    <button
      type="button"
      onClick={() => alert('Swish-betalning är inte kopplad ännu.')}
      className="w-full rounded-2xl bg-brand py-4 font-semibold text-zinc-950 transition-colors hover:bg-brand-dark active:scale-[0.99]"
    >
      Betala {amountSek} kr med Swish
    </button>
  )
}
