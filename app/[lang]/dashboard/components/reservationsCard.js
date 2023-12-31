'use client'
// components/ReservationsCard.js
import DriverOptions from './driverOptions';
import { Disclosure } from '@headlessui/react';
import { Button, getStatusColors } from '@/app/ui/';



function ReservationsCard({ title, reservations, driver, driverId, data }) {

  return  (
    <div className="bg-white p-6 rounded-lg mb-2 shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {reservations.length === 0 ? (
        <p>{data.noReservations}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {data.reference}
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {data.date}
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {data.pickupLocation}
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {data.destination}
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {data.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <Disclosure key={reservation.reservationRef}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        as="tr"
                        className={`focus:outline-none ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-gray-200`}
                      >
                        <td className="py-2 px-6 whitespace-nowrap hidden md:table-cell">
                          {reservation.reservationRef}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap">
                          {new Date(
                            reservation.reservationDate
                          ).toLocaleString()}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap hidden md:table-cell">
                          {reservation.pickupLocation}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap">
                          {reservation.destination}
                        </td>
                        <td
                          className={`py-2 px-6 whitespace-nowrap ${getStatusColors(
                            reservation.reservationStatus
                          ).text}`}
                        >
                          {driver && (reservation.reservationStatus === "PENDING" || reservation.reservationStatus === "CONFIRMED") ? (
                              <DriverOptions
                                status={reservation.reservationStatus}
                                reservationId={reservation.id}
                                driverId={driverId}
                                data={data}
                              />
                            ) : data.statusEnums[reservation.reservationStatus]}
                        </td>
                      </Disclosure.Button>
                      <Disclosure.Panel as="tr">
                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                          {/* Additional information about the reservation */}
                          <p className="text-sm text-gray-500">
                            <span className="font-bold">{data.reference +": "}</span>{reservation.reservationRef}
                            <span
                            className={`ml-3 font-bold text-sm ${getStatusColors(
                              reservation.reservationStatus).text}`}
                          >
                                {data.status + ": "}
                          </span>
                            <span
                            className={`text-sm ${getStatusColors(
                              reservation.reservationStatus).text}`}
                          >
                                {data.statusEnums[reservation.reservationStatus]}
                          </span>
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-bold">{data.date + ": "}</span>
                            {new Date(
                              reservation.reservationDate
                            ).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                          <span className="font-bold">{data.pickupLocation + ": "}</span>{reservation.pickupLocation}
                          </p>
                          <p className="text-sm text-gray-500">
                          <span className="font-bold">{data.destination + ": "}</span>{reservation.destination}
                          </p>
                          <p className="text-sm text-gray-500">
                          <span className="font-bold">{data.passengers + ": "}</span>{reservation.passengers}
                          <span className="ml-3 font-bold">{data.luggage + ": "}</span>{reservation.luggage}
                          </p>
                          {reservation.reservationStatus != "PENDING" && <ContactCard  reference={reservation.reservationRef} number={reservation.contactNumber} name={reservation.profileName} data={data} driver={driver}/>}
                        </td>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

)}


export default ReservationsCard;
function ContactCard({driver, data, name, number, reference}){
   function onHandleClick(){
    const waURL = "https://web.whatsapp.com/send?phone=" + number + "&text=";
    const waMobileURL = "https://wa.me/" + number + "?text=";
    let text = "hola"
    if (window.navigator.userAgent.includes('Mobile')) {
      window.open(waMobileURL + text);
  } else {
      window.open(waURL + text);
  }
  }
  return(
    <Button size="small" color="secondary" className={"inline-flex items-center"} onClick={onHandleClick}>
      <ChatIcon />{" "}
      {driver? data.contactClient: data.contactDriver}
      
  </Button>
  )
}
function ChatIcon(){
  return(
    <div className='p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
    </div>

  )
}

