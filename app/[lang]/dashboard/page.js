import { Navigation } from "../components/navigation"
import '@/app/styles/dashboard.css'
export default function Dashboard() {
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
    )
  }