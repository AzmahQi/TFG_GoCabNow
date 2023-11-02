
import '@/app/styles/globals.css'

import { i18n } from '@/i18n-config'
import LocaleSwitcher from './components/locale-switcher'
import { Navigation } from './components/navigation'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export const metadata = {
  title: 'Home | TFG',
  description: 'HAMZA',
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body>
        <header>
          <LocaleSwitcher />
          <Navigation />
        </header>
        {children}</body>
    </html>
  )
}
