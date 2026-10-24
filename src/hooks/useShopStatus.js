import { useEffect, useSyncExternalStore } from 'react'
import { getShopStatus, startSimulation, subscribe } from '../services/shopStatusService.js'

// Any component calling this re-renders whenever the shop status changes,
// whether the change came from this tab, another tab, or the simulation.
export function useShopStatus() {
  return useSyncExternalStore(subscribe, getShopStatus)
}

// Mounted once in the layout so the fake traffic runs on every page.
export function useShopSimulation() {
  useEffect(() => startSimulation(), [])
}
