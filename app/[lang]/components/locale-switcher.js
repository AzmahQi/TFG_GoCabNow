'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '../../../i18n-config'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function LocaleSwitcher() {
  const router = useRouter()
  const pathName = usePathname()
  const activeLocale = pathName.split('/')[1];
  const [selectedLocale, setSelectedLocale] = useState(activeLocale);
  const inactiveLocales = i18n.locales.filter((locale) => locale !== activeLocale);
  


  const handleLanguageChange = (event) => {
    const newLocale = event.target.value;
    setSelectedLocale(newLocale);
    const newPath = redirectedPathName(newLocale);
    router.refresh();
    router.push(newPath);
  };

  const redirectedPathName = (locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div>
     <select
       className="block py-1 my-1 py-0 mx-0  w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"
        value={selectedLocale}
        onChange={handleLanguageChange}
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
        }}
      >
       <option hidden>{selectedLocale.toUpperCase()}</option>
        {inactiveLocales.map((locale) => (
          <option key={locale} value={locale} className="text-gray-600 hover:bg-gray-200">
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}