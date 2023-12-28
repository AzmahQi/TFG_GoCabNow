'use client'
import React, { useState, useEffect } from 'react';

// Card component to wrap each counter
const CounterCard = ({ title, count }) => (
  <div className={`primary p-4 rounded-md shadow-md text-center`}>
    <p className="text-lg font-bold">{title}</p>
    <p className="text-2xl text-blue-500">{count}</p>
  </div>
);

const StatsCounter = ({content, clients, drivers, reservations }) => {
  const [registeredClients, setRegisteredClients] = useState(0);
  const [registeredDrivers, setRegisteredDrivers] = useState(0);
  const [registeredReservations, setReservations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const increment = 1;
      const finalRegisteredClients = clients;
      const finalRegisteredDrivers = drivers;
      const finalReservations = reservations;

      let currentRegisteredClients = 0;
      let currentRegisteredDrivers = 0;
      let currentReservations = 0;

      const interval = setInterval(() => {
        setRegisteredClients(currentRegisteredClients);
        setRegisteredDrivers(currentRegisteredDrivers);
        setReservations(currentReservations);

        if (currentRegisteredClients < finalRegisteredClients)
          currentRegisteredClients += increment;
        if (currentRegisteredDrivers < finalRegisteredDrivers)
          currentRegisteredDrivers += increment;
        if (currentReservations <= finalReservations)
          currentReservations += increment;

        if (
          currentRegisteredClients >= finalRegisteredClients &&
          currentRegisteredDrivers >= finalRegisteredDrivers &&
          currentReservations > finalReservations
        ) {
          clearInterval(interval);
        }
      }, 1);
    };

    fetchData();
  }, [clients, drivers, reservations]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Each counter is wrapped in a CounterCard component */}
      <CounterCard title={content.clients} count={registeredClients}  />
      <CounterCard title={content.drivers} count={registeredDrivers}  />
      <CounterCard title={content.reservations} count={registeredReservations} />
    </div>
  );
};

export default StatsCounter;