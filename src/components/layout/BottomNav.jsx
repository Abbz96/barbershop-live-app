import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'

// Thumb-reachable tab bar for phones. Hidden from the sm breakpoint upwards.
export default function BottomNav() {
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-10 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-3">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-2.5 text-xs ${
                  isActive ? 'text-brand' : 'text-zinc-400'
                }`
              }
            >
              <span className="text-lg" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
