import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl font-bold text-brand">404</p>
      <p className="mt-2 text-zinc-400">Sidan finns inte.</p>
      <Link to="/" className="mt-6 inline-block text-brand underline">
        Till startsidan
      </Link>
    </div>
  )
}
