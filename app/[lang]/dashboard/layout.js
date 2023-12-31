
import { Suspense } from 'react';
import Loading from "@/app/[lang]/components/loading"
import { getDictionary } from '@/get-dictionary'
import "@/app/styles/dashboard.css";
import Provider from "@/app/hooks/context";

export const metadata = {
  title: "Dashboard | GCN"
};

export default async function Layout({ children, params: { lang } }) {
  const dictionary = await getDictionary(lang);
  return (
    <Provider>
      <body>
      <Suspense fallback={<Loading loading={dictionary.loading} />}>
        {children}
      </Suspense>
      </body>
    </Provider>

  );
}
