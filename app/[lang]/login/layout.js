import {ToastContainer} from '@/app/nexttoast'
import { getDictionary } from '@/get-dictionary'
import SecondaryNavigation from '../components/navigation';
import Footer from '@/app/[lang]/components/footer'
import 'react-toastify/dist/ReactToastify.css';

export default async function Layout({ children, params: { lang } }) {

    const dictionary = await getDictionary(lang);
    return (
      <body className="bg-gray-300">
        <header className="shadow-md">
          <SecondaryNavigation data={dictionary.navigation} />
        </header>

        <main className="mt-20">{children}</main>
        <ToastContainer />
        <Footer content={dictionary.footer} />
      </body>
    );
  }