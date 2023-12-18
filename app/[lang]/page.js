import { getDictionary } from '@/get-dictionary'
import Navbar from '@/app/[lang]/components/navbar'
import { BigHero } from './components/bighero'
import Footer from './components/footer'
import Features from "@/app/[lang]/components/features"
import Testimonials from "@/app/[lang]/components/testimonials"


import '@/app/styles/main.css'
import Login from './login/page'
import Register from './register/page'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home({ params: { lang } }) {

  const dictionary = await getDictionary(lang);

  //retreive session information
  const session = await getServerSession(authOptions);
  return (
    <>
    <body className='primary'>
      <header className='shadow-md'>
        <Navbar session={session} data={dictionary.navigation}/>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <BigHero base={dictionary} content={dictionary.bighero}/>
        <pre>Session: {JSON.stringify(session)}</pre>
        <Features content={dictionary.features}/>
        <hr className="border-t-4 border-gray-400" />
        <Testimonials testimonials={dictionary.testimonials} />


      </main>
      <Footer />
      </body>
    </>
  );
}
