import { Roboto } from "next/font/google";
import { i18n } from "@/i18n-config";
import "@/app/styles/globals.css";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});
//Added coz build failed
export const dynamic = 'force-dynamic'
export const metadata = {
  title: "Home | TFG",
  description: "HAMZA",
};
export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang} className={roboto.className + " scroll-smooth"}>
      {children}
    </html>
  );
}
