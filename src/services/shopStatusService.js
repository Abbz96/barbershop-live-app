// Live shop status — a mock "backend" that lives in the browser.
//
// Components never touch the state directly: they read it through
// subscribe()/getShopStatus() and change it through the action functions.
// That keeps this file the only thing to replace when a real backend
// (e.g. Supabase Realtime) arrives — the components stay as they are.
//
// Changes are mirrored to other tabs with BroadcastChannel and kept in
// localStorage, so opening the barber view and the customer view in two tabs
// shows them updating each other. Different devices will need the backend.

export const SHOP_STATUSES = ['open', 'busy', 'closed']

const STORAGE_KEY = 'barbershop.shopStatus'
const CHANNEL_NAME = 'barbershop-shop-status'
const MAX_WAITING = 99

const defaultState = {
  status: 'open', // 'open' | 'busy' | 'closed'
  inChairs: 1,
  chairsTotal: 2,
  waiting: 2,
  avgServiceMinutes: 30,
  simulate: true, // let the mock invent customer traffic for demo purposes
  updatedAt: Date.now(),
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return saved ? { ...defaultState, ...saved } : defaultState
  } catch {
    return defaultState
  }
}

function save(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage can be blocked (private mode); the app still works in memory.
  }
}

let state = load()
const listeners = new Set()
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL_NAME) : null

function notify() {
  listeners.forEach((listener) => listener())
}

// Another tab changed the status — adopt it without broadcasting it back.
channel?.addEventListener('message', (event) => {
  state = event.data
  notify()
})

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function setState(patch) {
  const next = { ...state, ...patch, updatedAt: Date.now() }
  next.inChairs = clamp(next.inChairs, 0, next.chairsTotal)
  next.waiting = clamp(next.waiting, 0, MAX_WAITING)
  state = next
  save(state)
  channel?.postMessage(state)
  notify()
}

// --- Reading -----------------------------------------------------------------

export function getShopStatus() {
  return state
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Rough wait for someone joining the queue now: every chair serves one person
// per avgServiceMinutes, and everyone already waiting goes first.
export function estimateWaitMinutes({ status, inChairs, chairsTotal, waiting, avgServiceMinutes }) {
  if (status === 'closed') return null
  if (waiting === 0 && inChairs < chairsTotal) return 0
  return Math.ceil((waiting + 1) / chairsTotal) * avgServiceMinutes
}

// --- Barber actions -----------------------------------------------------------

export function setShopStatus(status) {
  if (SHOP_STATUSES.includes(status)) setState({ status })
}

export function changeWaiting(delta) {
  setState({ waiting: state.waiting + delta })
}

export function changeInChairs(delta) {
  setState({ inChairs: state.inChairs + delta })
}

// Move the first person in line into a free chair.
export function callNextCustomer() {
  if (state.waiting === 0 || state.inChairs >= state.chairsTotal) return
  setState({ waiting: state.waiting - 1, inChairs: state.inChairs + 1 })
}

export function setSimulation(simulate) {
  setState({ simulate })
}

// --- Simulation ---------------------------------------------------------------

// One random event per tick: a customer walks in, or a haircut finishes and the
// next in line sits down. Nobody arrives while the shop is closed.
function simulateTick() {
  if (!state.simulate) return

  const arrives = state.status !== 'closed' && Math.random() < 0.5
  if (arrives) {
    // Walk straight into a free chair if nobody is ahead in line.
    const freeChair = state.waiting === 0 && state.inChairs < state.chairsTotal
    if (freeChair) changeInChairs(1)
    else changeWaiting(1)
  } else if (state.inChairs > 0) {
    const nextSitsDown = state.waiting > 0
    setState({
      inChairs: nextSitsDown ? state.inChairs : state.inChairs - 1,
      waiting: nextSitsDown ? state.waiting - 1 : state.waiting,
    })
  }
}

// Returns a stop function. Each open tab runs its own timer, which only makes
// the fake traffic a little busier — fine for a demo.
export function startSimulation(intervalMs = 8000) {
  const id = setInterval(simulateTick, intervalMs)
  return () => clearInterval(id)
}
