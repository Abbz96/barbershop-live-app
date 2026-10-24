// Mock payment service. Nothing is charged and no card data leaves the browser.
//
// A real integration must run on a server, never in this frontend:
// - Swish: the Swish Commerce API, which needs a merchant certificate.
// - Card / Apple Pay: a provider such as Stripe, where card details go straight
//   to the provider's own fields and never touch our code.
// When that backend exists, only createPayment() below has to change.

import { services } from '../data/mockData.js'

const PROCESSING_MS = 2500
const VAT_RATE = 0.25 // Swedish VAT on haircuts

// Prices are VAT-inclusive, so the VAT share is price × 25/125.
export function vatIncluded(priceSek) {
  return Math.round((priceSek * VAT_RATE) / (1 + VAT_RATE))
}

function receiptNumber() {
  return `BL-${Date.now().toString(36).toUpperCase().slice(-6)}`
}

// Resolves with a receipt after a short fake delay, like a real provider would.
export function createPayment({ serviceId, method }) {
  const service = services.find((s) => s.id === serviceId)
  if (!service) return Promise.reject(new Error(`Unknown service: ${serviceId}`))

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        receiptNumber: receiptNumber(),
        paidAt: new Date(),
        serviceName: service.name,
        priceSek: service.priceSek,
        vatSek: vatIncluded(service.priceSek),
        method,
      })
    }, PROCESSING_MS)
  })
}
