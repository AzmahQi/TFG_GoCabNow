import { Roboto } from "next/font/google";
import { i18n } from "@/i18n-config";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});

export const metadata = {
  title: "Dashboard | TFG",
  description: "HAMZA",
};

export default function Layout({ children, params }) {
  return (
    <html lang={params.lang} className={roboto.className + " scroll-smooth"}>
      <body>{children}</body>
    </html>
  );
}
