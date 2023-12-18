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
       className="border rounded-sm text-dark bg-white"
        value={selectedLocale}
        onChange={handleLanguageChange}
      >
       <option hidden>{selectedLocale.toUpperCase()}</option>
        {inactiveLocales.map((locale) => (
          <option key={locale} value={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}