// Mock visit history: about 13 months of haircuts for one customer.
//
// The visits are generated rather than typed in, so the dates always end
// close to today and the charts look realistic whenever the app is opened.
// A seeded random generator makes the pattern the same on every load.

import { services } from './mockData.js'

const BARBERS = ['Omar', 'Sami']
const HISTORY_DAYS = 400

// Tiny seeded PRNG (mulberry32) — same seed, same "random" history.
function seededRandom(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickService(roll) {
  if (roll < 0.45) return services.find((s) => s.id === 'cut')
  if (roll < 0.85) return services.find((s) => s.id === 'combo')
  return services.find((s) => s.id === 'beard')
}

const toIsoDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

function generateVisits() {
  const random = seededRandom(42)
  const visits = []

  // Walk backwards from a little before today, one haircut every 3–5 weeks.
  const date = new Date()
  date.setHours(12, 0, 0, 0)
  date.setDate(date.getDate() - 9)
  const oldest = new Date(date)
  oldest.setDate(oldest.getDate() - HISTORY_DAYS)

  while (date > oldest) {
    const service = pickService(random())
    visits.push({
      id: visits.length + 1,
      date: toIsoDate(date),
      serviceName: service.name,
      priceSek: service.priceSek,
      barber: BARBERS[Math.floor(random() * BARBERS.length)],
    })
    date.setDate(date.getDate() - (21 + Math.floor(random() * 18)))
  }

  return visits // newest first
}

export const visitHistory = generateVisits()
