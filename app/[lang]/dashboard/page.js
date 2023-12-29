import { Suspense } from 'react'
import LoadingCard from './components/loadingCard';
import { DefaultUserImage } from '@/app/ui/ui'
import ReservationsCard from "@/app/[lang]/dashboard/components/reservationsCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {Sidebar} from '@/app/[lang]/dashboard/components/ver'
import { getDictionary } from "@/get-dictionary";
import { redirect } from "next/navigation";
import {getReservationsByUserId, getPendingReservations} from '@/lib/db'

const navigation = [
  { name: "Dashboard", href: "#", icon: "🏠", current: true },
  { name: "Team", href: "#", icon: "👥", current: false },
  { name: "Projects", href: "#", icon: "📁", current: false },
  { name: "Calendar", href: "#", icon: "📅", current: false },
  { name: "Documents", href: "#", icon: "📄", current: false },
  { name: "Reports", href: "#", icon: "📊", current: false },
];
export default async function VER({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const user = session.user.user
  const userId = session.user.profile.userId

  const role = session.user.role;
  const isDriver = ((role ==='Driver') ? true: false);
  let pendingReservations = null;
 if(isDriver){
  pendingReservations = await getPendingReservations ()
 }
   const reservations = await getReservationsByUserId (userId, role)
  console.log(userId, role, reservations)
  const futureReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.reservationDate);
    const currentDate = new Date();
    return reservationDate > currentDate;});
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Sidebar navigation={navigation} />


          <div className="md:pl-64 flex flex-col flex-1">
          <header className="bg-white border-b p-4">
                  {/* User Profile */}
                  <div className="flex-shrink-0 group block">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                      <DefaultUserImage className="inline-block" />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-dark">{user.name}</p>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                      </div>
                    </div>
            </a>
                  </div>
                </header>
          <main className="flex-1">
            <div className="py-6">

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                            {/* Existing content */}
            <div className="container">
            <Suspense fallback={  <div className="animate-pulse mb-4">
    <div className="h-8 bg-gray-300 w-3/4 mb-2 rounded"></div>
    <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
  </div>}>
              <h1 className="text-3xl font-bold mb-4">Welcome, {user.name} you are a {role} user. </h1>
            </Suspense>
              <Suspense fallback={<LoadingCard />}>
              {isDriver? <ReservationsCard driver={isDriver} driverId={userId} title={'Pending Reservations'} reservations={pendingReservations} />: null}
              </Suspense>
              <Suspense fallback={<LoadingCard />}>
              {isDriver? <ReservationsCard driver={isDriver} driverId={userId} title={'Current Reservations'} reservations={futureReservations} />:
              <ReservationsCard title={'Current Reservations'} reservations={futureReservations} />}
              </Suspense>
              <Suspense fallback={<LoadingCard />}>
              <ReservationsCard title={'All Reservations'} reservations={reservations} />
              </Suspense>
              {/* ... existing components ... */}
            </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}