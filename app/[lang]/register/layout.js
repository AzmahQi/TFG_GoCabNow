import {ToastContainer} from '@/app/hooks/nexttoast'
import { Suspense } from 'react';
import Loading from "@/app/[lang]/components/loading"
import { getDictionary } from '@/get-dictionary'
import SecondaryNavigation from '@/app/[lang]/components/secondaryNavigation';
import Footer from '@/app/[lang]/components/footer'
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: "Register | GCN"
};
export default async function Layout({ children, params: { lang } }) {
    const dictionary = await getDictionary(lang);
    return (
      <body className="bg-gray-300">
        <Suspense fallback={<Loading loading={dictionary.loading} />}>
        <header className="shadow-md">
          <SecondaryNavigation data={dictionary.navigation} />
        </header>

        <main className="mt-20">{children}</main>
        <ToastContainer />
        <Footer content={dictionary.footer} />
        </Suspense>
      </body>
    );
  }
