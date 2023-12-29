'use client'
// components/ReservationsCard.js

import DriverOptions from './driverOptions';
import { Disclosure } from '@headlessui/react';
import { getStatusColors } from '@/app/ui/ui';



function ReservationsCard({ title, reservations, driver, driverId,  }) {

  return  (
    <div className="bg-white p-6 rounded-lg mb-2 shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {reservations.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup Location
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
                        <td className="py-2 px-6 whitespace-nowrap">
                          {reservation.reservationRef}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap">
                          {new Date(
                            reservation.reservationDate
                          ).toLocaleString()}
                        </td>
                        <td className="py-2 px-6 whitespace-nowrap">
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
                          {driver ? (
                              <DriverOptions
                                status={reservation.reservationStatus}
                                reservationId={reservation.id}
                                driverId={driverId}
                              />
                            ) : reservation.reservationStatus}
                        </td>
                      </Disclosure.Button>
                      <Disclosure.Panel as="tr">
                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                          {/* Additional information about the reservation */}
                          <p className="text-sm text-gray-500">
                            Reservation ID: {reservation.id}
                          </p>
                          <p className="text-sm text-gray-500">
                            Date:{" "}
                            {new Date(
                              reservation.reservationDate
                            ).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Pickup Location: {reservation.pickupLocation}
                          </p>
                          <p className="text-sm text-gray-500">
                            Destination: {reservation.destination}
                          </p>
                          <p
                            className={`text-sm ${getStatusColors(
                              reservation.reservationStatus).text}`}
                          >

                                Status: {reservation.reservationStatus}
                                
                          </p>
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
