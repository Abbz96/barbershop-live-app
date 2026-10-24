// Customer visit statistics. Reads the mock history today; swap getVisits()
// for a database query later and every view keeps working.

import { visitHistory } from '../data/visitHistory.js'

const DAY_MS = 24 * 60 * 60 * 1000

// Parse 'YYYY-MM-DD' as a local date (new Date('2026-01-05') would be UTC).
export function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

export function getVisits() {
  return visitHistory
}

export function getTotalVisits() {
  return getVisits().length
}

export function getVisitsInYear(year) {
  return getVisits().filter((visit) => parseDate(visit.date).getFullYear() === year)
}

// Twelve numbers, January to December.
export function getMonthlyCounts(year) {
  const counts = Array(12).fill(0)
  getVisitsInYear(year).forEach((visit) => counts[parseDate(visit.date).getMonth()]++)
  return counts
}

// The customer's usual gap between haircuts (median of the last few gaps,
// so one unusually long break doesn't skew it) and when the next is due.
export function getVisitRhythm(today = new Date()) {
  const recent = getVisits().slice(0, 7).map((visit) => parseDate(visit.date))
  if (recent.length < 2) return null

  const gaps = recent.slice(0, -1).map((date, i) => Math.round((date - recent[i + 1]) / DAY_MS))
  const sorted = [...gaps].sort((a, b) => a - b)
  const typicalGapDays = sorted[Math.floor(sorted.length / 2)]

  const lastVisit = recent[0]
  const nextDue = new Date(lastVisit.getTime() + typicalGapDays * DAY_MS)
  const daysUntilDue = Math.round((nextDue - today) / DAY_MS)
  const daysSinceLast = Math.round((today - lastVisit) / DAY_MS)

  return { typicalGapDays, lastVisit, nextDue, daysUntilDue, daysSinceLast }
}
