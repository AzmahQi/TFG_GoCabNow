import { getServerSession } from "next-auth";
import { Navigation } from "../components/navigation";
import { getDictionary } from "@/get-dictionary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import "@/app/styles/dashboard.css";
export default async function Dashboard({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="h1">Dashboard</h1>
        </div>
      </main>
    </>
  );
}
