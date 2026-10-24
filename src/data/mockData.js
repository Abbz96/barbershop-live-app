// Placeholder data so the UI can be built before a backend exists.
// The live queue has moved to src/services/shopStatusService.js.

export const loyalty = {
  visits: 7,
  visitsForReward: 10,
  rewardLabel: 'Gratis klippning',
}

export const services = [
  { id: 'cut', name: 'Klippning', priceSek: 350, minutes: 30 },
  { id: 'beard', name: 'Skägg', priceSek: 200, minutes: 15 },
  { id: 'combo', name: 'Klippning + skägg', priceSek: 500, minutes: 45 },
]
