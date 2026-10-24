// Placeholder data so the UI can be built before a backend exists.
// Replace these with real API calls once the queue and loyalty services are live.

export const queue = [
  { id: 1, name: 'Ali', service: 'Klippning', barber: 'Omar', etaMinutes: 0 },
  { id: 2, name: 'Johan', service: 'Skägg', barber: 'Omar', etaMinutes: 15 },
  { id: 3, name: 'Du', service: 'Klippning + skägg', barber: 'Sami', etaMinutes: 25, isCurrentUser: true },
  { id: 4, name: 'Erik', service: 'Klippning', barber: 'Sami', etaMinutes: 45 },
]

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

export const barbers = [
  { id: 'omar', name: 'Omar', status: 'busy' },
  { id: 'sami', name: 'Sami', status: 'available' },
]
