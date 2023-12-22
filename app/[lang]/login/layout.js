import { Roboto } from "next/font/google";
import { i18n } from "@/i18n-config";
import {ToastContainer} from '@/app/nexttoast'
import 'react-toastify/dist/ReactToastify.css';
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});

export const metadata = {
  title: "Login | TFG",
  description: "HAMZA",
};

export default function Layout({ children, params }) {
  return (
    <>
    <html >
      <div>{children}</div>
      
      <div><ToastContainer /></div>
      
    </html>
    </>
  );
}
