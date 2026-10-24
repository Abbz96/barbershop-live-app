import { Link, NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between sm:max-w-2xl lg:max-w-4xl">
        <Link to="/" className="font-bold tracking-tight">
          <span className="text-brand">Barbershop</span> Live
        </Link>

        {/* Desktop navigation — on phones the bottom nav takes over. */}
        <nav className="hidden sm:flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-zinc-800 text-brand' : 'text-zinc-400 hover:text-zinc-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
