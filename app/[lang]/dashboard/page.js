import { Suspense } from 'react'
import LoadingCard from './components/loadingCard';
import { DefaultUserImage, Button, Modal } from '@/app/ui/'
import ReservationsCard from "@/app/[lang]/dashboard/components/reservationsCard";
import BookNow from "@/app/[lang]/booknow/page"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from '@/app/[lang]/dashboard/components/sideBar'
import { getDictionary } from "@/get-dictionary";
import { redirect } from "next/navigation";
import {getReservationsByUserId, getPendingReservations, updateUserProfile} from '@/lib/db'
import ProfileCard from './components/profileCard';


export default async function Dashboard({ params: { lang } }) {

  //translation const
  const dictionary = await getDictionary(lang);
  const data = dictionary.dashboard;
  const reservationCardData = data.reservationCard;
  const navigation = dictionary.navigation.dashboardMenu;
  //session
  let session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  //Database related data
  const user = session.user;
  const userId = session.user.profile.userId
  const userBirthDate = new Date(session.user.profile.birthDate).toUTCString()
  const role = session.user.role;
  const isDriver = ((role ==='Driver') ? true: false);
  let pendingReservations = null;
 if(isDriver){
  pendingReservations = await getPendingReservations ()
 }
   const reservations = await getReservationsByUserId (userId, role)
  const futureReservations = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.reservationDate);
    const currentDate = new Date();
    return reservationDate > currentDate;});

    const profileData = {
      userId: userId,
      name: user.name,
      email: user.email,
      birthDate: userBirthDate,
      contactNumber: session.user.contactNumber,
      gender: session.user.profile.gender,
    };

  return (
    <>

      <div>
        <Sidebar navigation={navigation} />

        <div className="md:pl-64 flex flex-col flex-1">
          <header className="bg-white border-b p-4">
            {/* User Profile */}
            <div className="flex-shrink-0 group block">
            <Modal
              triggerElement={
                <a className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <div>
                    <DefaultUserImage className="inline-block" />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-dark">
                      {user.name}
                    </p>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                      {data.viewProfile}
                    </p>
                  </div>
                </div>
              </a>
              }
              modalContent={<ProfileCard content={dictionary.registerForm} initialData={profileData}  />}
              buttonText="Close"
            />

            </div>
          </header>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="container">
                  <Suspense
                    fallback={
                      <div className="animate-pulse mb-4">
                        <div className="h-8 bg-gray-300 w-3/4 mb-2 rounded"></div>
                        <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
                      </div>
                    }
                  >
                    <h1 className="text-3xl font-bold mb-4">
                      {data.welcome + " " + user.name} {' '} {!isDriver && <Modal
              triggerElement={
                <Button color="primary" className="ml-4">
                  {dictionary.bighero.button}
                </Button>
              }
              modalContent={<BookNow className="text-white" dictionary={dictionary} session={session}/>}
              buttonText="Close"
            />}
                    </h1>
                  </Suspense>
                  <Suspense fallback={<LoadingCard />}>
                    {isDriver ? (
                      <ReservationsCard
                        driver={isDriver}
                        driverId={userId}
                        title={data.pendingReservations}
                        reservations={pendingReservations}

                        data={reservationCardData}
                      />
                    ) : null}
                  </Suspense>
                  <Suspense fallback={<LoadingCard />}>
                    {isDriver ? (
                      <ReservationsCard
                        driver={isDriver}
                        driverId={userId}
                        title={data.currentReservations}
                        reservations={futureReservations}

                        data={reservationCardData}
                      />
                    ) : (
                      <ReservationsCard
                      driver={isDriver}
                        title={data.currentReservations}
                        reservations={futureReservations}
                        data={reservationCardData}
                      />
                    )}
                  </Suspense>
                  <Suspense fallback={<LoadingCard />}>
                    <ReservationsCard
                    driver={isDriver}
                      title={data.allReservations}
                      reservations={reservations}
                      data={reservationCardData}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}