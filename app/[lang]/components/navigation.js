'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navigation() {
  const pathname = usePathname()
  const path = pathname.slice(3)
  return (
    <nav className="bg-blue-500 py-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link
            className={`text-white ${path === '' ? 'font-bold' : ''}`}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`text-white ${path === '/dashboard' ? 'font-bold' : ''}`}
            href="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}