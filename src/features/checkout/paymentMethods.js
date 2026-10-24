// The payment options shown in checkout, in display order.
export const paymentMethods = [
  { id: 'swish', label: 'Swish', hint: 'Betala med mobilnummer' },
  { id: 'card', label: 'Kort', hint: 'Visa, Mastercard' },
  { id: 'applepay', label: 'Apple Pay', hint: 'Snabbt med Face ID' },
]

export const methodLabel = (id) => paymentMethods.find((m) => m.id === id)?.label ?? id

export const formatSek = (amount) => `${amount.toLocaleString('sv-SE')} kr`
