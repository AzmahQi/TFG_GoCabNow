import { getDictionary } from '@/get-dictionary'
import Navbar from '@/app/[lang]/components/navbar'
import { BigHero } from './components/bighero'
import Footer from './components/footer'
import Features from "@/app/[lang]/components/features"
import Testimonials from "@/app/[lang]/components/testimonials"
import AboutUs from "@/app/[lang]/components/aboutus"
import FAQs from "@/app/[lang]/components/faqs"
import Stats from './components/stats'
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
        <BigHero base={dictionary} content={dictionary.bighero} profile={session?.user?.profile}/>
        <Stats content={dictionary.stats}/>
        <Features content={dictionary.features}/>
        <Testimonials testimonials={dictionary.testimonials} />
        <FAQs content={dictionary.faqsSection}/>
        <AboutUs content={dictionary.aboutUs}/>
      </main>
      <Footer content={dictionary.footer} />
      </body>
    </>
  );
}
