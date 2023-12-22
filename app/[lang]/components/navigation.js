'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import useScrollListener from '@/app/hooks/useScrollListener'
export function Navigation() {
  const pathname = usePathname()
  const path = pathname.slice(3)

  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];
    
    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("nav-bar--hidden");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);
  return (
    <nav className={navClassList.join(" ")+" fixed top-0 z-10 bg-blue-500 py-4"}>
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