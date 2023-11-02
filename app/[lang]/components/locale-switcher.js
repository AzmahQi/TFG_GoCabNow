'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '../../../i18n-config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }
  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => {
            
          return (
            <li key={locale}>
              <Link className='font-medium text-blue-600 dark:text-blue-500 hover:underline' href={redirectedPathName(locale)}>
              {locale}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}