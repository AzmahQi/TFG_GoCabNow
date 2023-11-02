import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
export default async function Home({ params: { lang } }) {

  const dictionary = await getDictionary(lang)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Home</h1>

        <p>{dictionary.hi}</p>
      </div>
    </main>
  )
}
