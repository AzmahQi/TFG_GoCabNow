import { getDictionary } from '@/get-dictionary'
import Navbar from '@/app/[lang]/components/navbar'
import { BigHero } from './components/bighero'
import Footer from './components/footer'
import { Locale } from '@/i18n-config'
import '@/app/styles/main.css'


export default async function Home({ params: { lang } }) {

  const dictionary = await getDictionary(lang)
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <BigHero base={dictionary} content={dictionary.bighero}/>
        
      </main>
      <Footer />
    </>
  );
}
