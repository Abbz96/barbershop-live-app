import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import BottomNav from './BottomNav.jsx'
import { useShopSimulation } from '../../hooks/useShopStatus.js'

// Mobile-first shell: a narrow centred column with a fixed bottom nav on phones.
// On wider screens the column simply grows and the nav moves into the header.
export default function Layout() {
  useShopSimulation()

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-24 sm:max-w-2xl sm:pb-8 lg:max-w-4xl">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
